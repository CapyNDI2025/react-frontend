import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../lib/store/chatStore';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const { status, messages, currentPersonality } = useChatStore();
  const audioContextRef = useRef(null);
  const humOscillatorRef = useRef(null);
  const humGainRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.value = 50;
    
    filter.type = 'lowpass';
    filter.frequency.value = 120;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.value = 0;
    osc.start();

    humOscillatorRef.current = osc;
    humGainRef.current = gain;

    const resumeAudio = () => {
      if (ctx.state === 'suspended') ctx.resume();
    };
    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);

    return () => {
      osc.stop();
      ctx.close();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };
  }, []);

  useEffect(() => {
    if (!humGainRef.current || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    if (status === 'thinking') {
      humGainRef.current.gain.setTargetAtTime(0.1, now, 0.5);
    } else {
      humGainRef.current.gain.setTargetAtTime(0.015, now, 0.5);
    }
  }, [status]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    
    if (messages.length > lastMessageCountRef.current && lastMsg?.role === 'assistant') {
      speak(lastMsg.content, currentPersonality);
    }
    
    lastMessageCountRef.current = messages.length;
  }, [messages, currentPersonality]);

  const speak = useCallback((text, personality) => {
    if (!window.speechSynthesis) return;
    
    let textToSpeak = text;
    try {
        const parsed = JSON.parse(text);
        textToSpeak = parsed.content;
    } catch (e) {
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr')) || voices[0];
    if (frVoice) utterance.voice = frVoice;

    if (personality === 'nullpointer') {
      utterance.pitch = 0.1 + Math.random() * 1.9;
      utterance.rate = 0.2 + Math.random() * 1.2;
    } else {
      utterance.pitch = 0.5;
      utterance.rate = 0.8;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  const playClick = useCallback((personality) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (personality === 'abysse') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
      
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      
      osc.start(t);
      osc.stop(t + 0.1);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.linearRampToValueAtTime(800, t + 0.05);
      
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      
      osc.start(t);
      osc.stop(t + 0.1);
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playClick, speak }}>
      {children}
    </AudioContext.Provider>
  );
};
