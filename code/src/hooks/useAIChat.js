import { useState, useEffect } from 'react';
import { useChatStore } from '../lib/store/chatStore';

export const useAIChat = () => {
  const { messages, addMessage, setStatus, status, initChat, setEmotion } = useChatStore();
  const [inputValue, setInputValue] = useState('');

  // Initialiser le chat avec le System Prompt au montage
  useEffect(() => {
    initChat();
  }, [initChat]);

  const callRealLLM = async (messagesHistory) => {
    setStatus('thinking');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn("Pas de clé API Gemini configurée");
      await new Promise(r => setTimeout(r, 1000));
      setStatus('speaking');
      addMessage({ role: 'assistant', content: "Je n'ai pas de clé API valide. Configurez VITE_GEMINI_API_KEY dans le fichier .env pour me connecter à Google Gemini." });
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      // Conversion de l'historique pour Gemini
      // Gemini attend : { role: "user" | "model", parts: [{ text: "..." }] }
      const contents = messagesHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // L'API Gemini ne supporte pas toujours le rôle 'system' directement dans 'contents' pour certains endpoints,
      // mais on peut le passer comme un premier message 'user' ou utiliser l'instruction système si le modèle le supporte.
      // Ici, on simplifie en traitant tout ce qui n'est pas 'model' comme 'user'.

      // Utilisation de gemini-pro qui est généralement plus stable sur l'endpoint v1beta public
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: contents
        })
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      // Extraction de la réponse Gemini
      const rawContent = data.candidates[0].content.parts[0].text;
      
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
      setStatus('speaking');
      addMessage({ role: 'assistant', content: aiContent });

      // Temps de parole approximatif
      const speakingDuration = Math.min(aiContent.length * 50, 5000);
      setTimeout(() => setStatus('idle'), speakingDuration);

    } catch (error) {
      console.error("Erreur API:", error);
      setStatus('error');
      addMessage({ role: 'assistant', content: `Erreur: ${error.message}` });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || status !== 'idle') return;

    const userText = inputValue;
    setInputValue('');
    
    const newUserMessage = { role: 'user', content: userText };
    addMessage(newUserMessage);
    
    // On envoie tout l'historique + le nouveau message à l'API
    await callRealLLM([...messages, newUserMessage]);
  };

  return {
    messages,
    status,
    inputValue,
    setInputValue,
    handleSendMessage
  };
};
