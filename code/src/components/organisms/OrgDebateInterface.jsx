import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAIChat } from '../../hooks/useAIChat';
import { useChatStore } from '../../lib/store/chatStore';

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DebateContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center; /* Center the content */
  align-items: flex-end;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 10;
`;

const CentralChatBox = styled.div`
  width: 35%; /* Reduced width */
  min-width: 320px;
  max-width: 500px;
  height: 80%;
  background: rgba(20, 25, 40, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  position: relative;
`;

const Header = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const MessagesArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }
`;

const MessageBubble = styled.div`
  padding: 1rem;
  border-radius: 12px;
  line-height: 1.5;
  font-size: 0.95rem;
  animation: ${fadeIn} 0.3s ease-out;
  color: #E0E0E0;
  max-width: 80%;
  
  /* Align based on personality */
  align-self: ${props => props.$personality === 'abysse' ? 'flex-start' : 'flex-end'};
  
  ${props => props.$personality === 'abysse' && css`
    font-family: 'Georgia', serif;
    font-style: italic;
    background: linear-gradient(135deg, rgba(30, 20, 60, 0.8) 0%, rgba(10, 5, 20, 0.9) 100%);
    border: 1px solid rgba(255, 215, 0, 0.2);
    color: #E6E6FA;
    border-bottom-left-radius: 2px;
    
    &::before {
      content: 'Jean-Michel Abysse';
      display: block;
      font-size: 0.7rem;
      color: rgba(255, 215, 0, 0.5);
      margin-bottom: 0.3rem;
      font-style: normal;
      font-family: sans-serif;
    }
  `}

  ${props => props.$personality === 'nullpointer' && css`
    font-family: 'Courier New', monospace;
    background: rgba(0, 0, 0, 0.85);
    color: #00FF41;
    border: 1px dashed #00FF41;
    border-bottom-right-radius: 2px;
    
    &:hover {
      animation: ${glitchAnim} 0.3s infinite;
    }

    &::before {
      content: 'Socrates_v0.0.1';
      display: block;
      font-size: 0.7rem;
      color: #FF00FF;
      margin-bottom: 0.3rem;
      font-weight: bold;
      text-align: right;
    }
  `}
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s;
  
  ${props => props.$variant === 'stop' ? css`
    background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
    color: white;
    &:hover { box-shadow: 0 4px 12px rgba(255, 65, 108, 0.3); }
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:hover { background: rgba(255, 255, 255, 0.2); }
  `}
`;

const OrgDebateInterface = () => {
  const { messages, status, currentPersonality, isDebatePaused } = useChatStore();
  const { toggleDebateMode, pauseDebate, resumeDebate } = useAIChat();
  const scrollRef = useRef(null);

  const debateMessages = messages.filter(msg => msg.role === 'assistant' || (msg.role === 'user' && !msg.content.includes('[RÉPONSE À L\'AUTRE IA]')));

  const getMessagePersonality = (msg, index) => {
      let speaker = 'abysse';
      
      let tempSpeaker = 'abysse';
      for (let i = 0; i <= messages.indexOf(msg); i++) {
          const m = messages[i];
          if (m.role === 'system') {
              if (m.content.includes('Jean-Michel Abysse')) tempSpeaker = 'abysse';
              else if (m.content.includes('Socrates')) tempSpeaker = 'nullpointer';
          }
      }
      return tempSpeaker;
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <DebateContainer>
      <CentralChatBox>
        <Header>Débat en cours</Header>
        <MessagesArea ref={scrollRef}>
          {debateMessages.map((msg, index) => {
             const personality = getMessagePersonality(msg);
             let content = msg.content;
             try {
                 const parsed = JSON.parse(msg.content);
                 content = parsed.content;
             } catch (e) {}

             return (
                <MessageBubble key={index} $personality={personality}>
                  {content}
                </MessageBubble>
             );
          })}
          
          {status === 'thinking' && (
            <div style={{ 
                alignSelf: currentPersonality === 'abysse' ? 'flex-start' : 'flex-end',
                color: 'rgba(255,255,255,0.5)', 
                fontStyle: 'italic',
                fontSize: '0.8rem',
                marginTop: '0.5rem'
            }}>
              {currentPersonality === 'abysse' ? 'Jean-Michel réfléchit...' : 'Socrates calcule...'}
            </div>
          )}
        </MessagesArea>
        
        <Controls>
            {!isDebatePaused ? (
              <Button $variant="stop" onClick={pauseDebate}>
                Pause
              </Button>
            ) : (
              <Button $variant="stop" onClick={resumeDebate}>
                Reprendre
              </Button>
            )}
            <Button $variant="stop" onClick={toggleDebateMode} style={{ background: 'rgba(255, 50, 50, 0.3)' }}>
              Quitter
            </Button>
        </Controls>
      </CentralChatBox>
    </DebateContainer>
  );
};

export default OrgDebateInterface;
