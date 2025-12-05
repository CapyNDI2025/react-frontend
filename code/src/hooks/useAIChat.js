import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../lib/store/chatStore';
import { useAudio } from '../contexts/AudioContext';
import OpenAI from 'openai';

export const useAIChat = () => {
  const { 
    messages, 
    addMessage, 
    clearMessages,
    updateLastMessage, 
    setStatus, 
    status, 
    initChat, 
    setEmotion, 
    emotion, 
    setVisualItems,
    currentPersonality,
    setPersonality,
    personalities,
    isDebateMode,
    isDebatePaused,
    setDebateMode,
    setDebatePaused
  } = useChatStore();
  
  const audio = useAudio();
  const playClick = audio ? audio.playClick : () => {};

  const [inputValue, setInputValue] = useState('');
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const abortControllerRef = useRef(null);
  const debateTimeoutRef = useRef(null);

  useEffect(() => {
    initChat();
  }, [initChat]);

  useEffect(() => {
    if (!isDebateMode || isDebatePaused) {
      if (debateTimeoutRef.current) clearTimeout(debateTimeoutRef.current);
      return;
    }

    if (status === 'idle' && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      
      if (lastMsg.role === 'assistant') {
        debateTimeoutRef.current = setTimeout(() => {
          triggerDebateTurn(lastMsg.content);
        }, 2000);
      }
    }

    return () => {
      if (debateTimeoutRef.current) clearTimeout(debateTimeoutRef.current);
    };
  }, [isDebateMode, isDebatePaused, status, messages]);

  // Change de personnalité active et déclenche automatiquement la réponse suivante lors d'un débat
  const triggerDebateTurn = (lastContent) => {
    const nextPersonality = currentPersonality === 'abysse' ? 'nullpointer' : 'abysse';
    setPersonality(nextPersonality);

    const prompt = `[RÉPONSE À L'AUTRE IA] : "${lastContent}". Réponds-lui selon ton caractère.`;
    
    handleSendMessage(null, prompt);
  };

  // Active ou désactive le mode débat, en lançant la conversation initiale ou en nettoyant l'interface
  const toggleDebateMode = () => {
    const newMode = !isDebateMode;
    
    if (newMode) {
      clearMessages();
      setDebateMode(true);
      
      const startPrompt = "Lançons un débat. Sujet : 'La conscience des grille-pains'. Commence !";
      const systemPrompt = personalities[currentPersonality].systemPrompt;
      const newUserMessage = { role: 'user', content: startPrompt };
      
      addMessage(newUserMessage);
      callRealLLM([systemPrompt, newUserMessage]);
    } else {
      setDebateMode(false);
      if (debateTimeoutRef.current) clearTimeout(debateTimeoutRef.current);
      stopGeneration();
      clearMessages();
    }
  };

  // Met le débat en pause temporaire sans effacer l'historique des messages
  const pauseDebate = () => {
    setDebatePaused(true);
    if (debateTimeoutRef.current) clearTimeout(debateTimeoutRef.current);
    stopGeneration();
  };

  // Relance le débat là où il s'était arrêté après une pause
  const resumeDebate = () => {
    setDebatePaused(false);
  };

  // Interrompt immédiatement la génération de texte en cours et annule la requête API
  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (status === 'thinking') {
      setStatus('idle');
    }
  };

  // Utilise la synthèse vocale du navigateur pour lire le texte fourni à voix haute
  const speakText = (text, index) => {
    if (!window.speechSynthesis) return;
    
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setStatus('idle');
      setSpeakingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; 
    
    utterance.onstart = () => {
      setStatus('speaking');
      setSpeakingIndex(index);
    };
    utterance.onend = () => {
      setStatus('idle');
      setSpeakingIndex(null);
    };
    utterance.onerror = () => {
      setStatus('idle');
      setSpeakingIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Envoie l'historique de la conversation à l'API DeepSeek pour générer une réponse intelligente.
  const callRealLLM = async (messagesHistory) => {
    setStatus('thinking');
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

    
    if (!apiKey) {
      console.warn("Pas de clé API DeepSeek configurée");
      await new Promise(r => setTimeout(r, 1000));
      setStatus('speaking');
      addMessage({ role: 'assistant', content: "Je n'ai pas de clé API valide. Configurez VITE_DEEPSEEK_API_KEY dans le fichier .env pour me connecter." });
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const openai = new OpenAI({
      baseURL: window.location.origin + '/deepseek', 
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    try {
      const apiMessages = messagesHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const stream = await openai.chat.completions.create({
        messages: apiMessages,
        model: "deepseek-chat",
        temperature: 1.3,
        stream: true,
      }, { signal: abortControllerRef.current.signal });

      let fullContent = '';
      addMessage({ role: 'assistant', content: '' });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullContent += content;
        
        const trimmed = fullContent.trim();
        if (trimmed.startsWith('{')) {
          const match = fullContent.match(/"content"\s*:\s*"((?:[^"\\]|\\.)*)/);
          if (match) {
            try {
              const currentText = JSON.parse(`"${match[1]}"`); 
              updateLastMessage(currentText);
            } catch (e) {
              updateLastMessage(match[1]);
            }
          }
        } else {
          const displayText = fullContent.replace(/^```json\s*/, '').replace(/^```\s*/, '');
          updateLastMessage(displayText);
        }
      }

      let aiEmotion = 'neutral';
      let finalContent = fullContent;

      try {
        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          const parsed = JSON.parse(jsonString);
          
          if (parsed.emotion) aiEmotion = parsed.emotion;
          if (parsed.content) finalContent = parsed.content;
          
          if (parsed.data && parsed.data.items) {
             setVisualItems(parsed.data.items);
          } else {
             setVisualItems([]);
          }
        } else {
          finalContent = fullContent.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '');
        }

      } catch (e) {
        console.warn("Parsing JSON échoué, tentative de récupération...", e);
        if (fullContent.trim().startsWith('{')) {
           const match = fullContent.match(/"content"\s*:\s*"((?:[^"\\]|\\.)*)"/);
           if (match) {
             try {
                finalContent = JSON.parse(`"${match[1]}"`);
             } catch (err) {
                finalContent = match[1];
             }
           }
        }
      }

      updateLastMessage(finalContent);
      setEmotion(aiEmotion);
      setStatus('idle');

    } catch (error) {
      if (error.name === 'AbortError' || error.message === 'Request was aborted.') {
        console.log('Generation stopped by user');
        setStatus('idle');
        return;
      }
      console.error("Erreur API:", error);
      setStatus('error');
      addMessage({ role: 'assistant', content: `Erreur: ${error.message}` });
      
      if (isDebateMode && !isDebatePaused) {
          setDebatePaused(true);
          addMessage({ role: 'system', content: "Le débat a été mis en pause suite à une erreur technique." });
      }

      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      abortControllerRef.current = null;
    }
  };

  // Gère l'envoi d'un message par l'utilisateur, joue un son de clic et initie l'appel à l'IA
  const handleSendMessage = async (e, overridePrompt = null) => {
    if (e) e.preventDefault();
    
    const prompt = overridePrompt || inputValue;
    if (!prompt.trim()) return;

    // Play Click Sound
    playClick(currentPersonality);

    const newUserMessage = { role: 'user', content: prompt };
    addMessage(newUserMessage);
    setInputValue('');
    
    // Call LLM
    await callRealLLM([...messages, newUserMessage]);
  };

  return { 
    messages, 
    status, 
    inputValue, 
    setInputValue, 
    handleSendMessage, 
    stopGeneration, 
    emotion, 
    speakText, 
    speakingIndex,
    currentPersonality,
    setPersonality,
    personalities,
    isDebateMode,
    isDebatePaused,
    toggleDebateMode,
    pauseDebate,
    resumeDebate
  };
};
