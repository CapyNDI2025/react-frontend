import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../lib/store/chatStore';
import OpenAI from 'openai';

export const useAIChat = () => {
  const { messages, addMessage, setStatus, status, initChat, setEmotion, emotion } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const abortControllerRef = useRef(null);

  // Initialiser le chat avec le System Prompt au montage
  useEffect(() => {
    initChat();
  }, [initChat]);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    // On arrête uniquement la génération de texte (thinking), pas la parole (speaking)
    if (status === 'thinking') {
      setStatus('idle');
    }
  };

  const speakText = (text, index) => {
    if (!window.speechSynthesis) return;
    
    // Si on clique sur le message en cours de lecture, on arrête tout
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setStatus('idle');
      setSpeakingIndex(null);
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; 
    // On peut ajuster la voix ici si besoin
    
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

  const callRealLLM = async (messagesHistory) => {
    setStatus('thinking');
    
    // Cancel any previous request
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
      // DeepSeek utilise le format compatible OpenAI
      const apiMessages = messagesHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const completion = await openai.chat.completions.create({
        messages: apiMessages,
        model: "deepseek-chat",
        temperature: 1.3,
      }, { signal: abortControllerRef.current.signal });

      // Extraction de la réponse DeepSeek
      const rawContent = completion.choices[0].message.content;
      
      let aiContent = rawContent;
      let aiEmotion = 'neutral';

      try {
        // Nettoyage du markdown JSON si présent (Gemini aime bien mettre ```json ... ```)
        const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        
        if (parsed.content) aiContent = parsed.content;
        if (parsed.emotion) aiEmotion = parsed.emotion;
      } catch (e) {
        console.warn("L'IA n'a pas répondu en JSON valide, fallback sur texte brut.", e);
        // On garde le texte brut si le parsing échoue
      }

      setEmotion(aiEmotion);
      addMessage({ role: 'assistant', content: aiContent });
      setStatus('idle');

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Generation stopped by user');
        setStatus('idle');
        return;
      }
      console.error("Erreur API:", error);
      setStatus('error');
      addMessage({ role: 'assistant', content: `Erreur: ${error.message}` });
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || status === 'thinking') return;

    const userText = inputValue;
    setInputValue('');
    
    const newUserMessage = { role: 'user', content: userText };
    addMessage(newUserMessage);
    
        // On envoie tout l'historique + le nouveau message à l'API
    await callRealLLM([...messages, newUserMessage]);
  };

  return { messages, status, inputValue, setInputValue, handleSendMessage, stopGeneration, emotion, speakText, speakingIndex };
};
