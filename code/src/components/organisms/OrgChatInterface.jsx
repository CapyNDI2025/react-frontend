import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAIChat } from '../../hooks/useAIChat';

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

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 2rem;
  padding-right: 5%;
  box-sizing: border-box;
  z-index: 10;
`;

const ChatBox = styled.div`
  position: relative;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  max-width: 50vw;
  max-height: 90vh;
  min-width: 300px;
  min-height: 200px;
  
  background: rgba(20, 25, 40, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2rem;
  pointer-events: auto;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;

const Handle = styled.div`
  position: absolute;
  background: transparent;
  z-index: 20;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LeftHandle = styled(Handle)`
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  cursor: ew-resize;
`;

const TopHandle = styled(Handle)`
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  cursor: ns-resize;
`;

const CornerHandle = styled(Handle)`
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  border-top-left-radius: 24px;
  /* Visual indicator for the corner */
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-top: 2px solid rgba(255,255,255,0.5);
    border-left: 2px solid rgba(255,255,255,0.5);
  }
`;

const PersonalitySelector = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 12px;
  flex-shrink: 0;
`;

const PersonaButton = styled.button`
  flex: 1;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  border: 1px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-right: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }
`;

const MessageBubble = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 18px;
  max-width: 85%;
  line-height: 1.6;
  font-size: 1rem;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
  word-wrap: break-word;
  animation: ${fadeIn} 0.3s ease-out;
  
  ${props => props.$isUser ? css`
    align-self: flex-end;
    background: linear-gradient(135deg, #00BFFF 0%, #0066CC 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : css`
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    
    /* DEFAULT / ABYSSE STYLE */
    background: rgba(255, 255, 255, 0.08);
    color: #E0E0E0;
    border: 1px solid rgba(255, 255, 255, 0.05);

    ${props.$personality === 'abysse' && css`
      font-family: 'Georgia', serif;
      font-style: italic;
      background: linear-gradient(135deg, rgba(30, 20, 60, 0.8) 0%, rgba(10, 5, 20, 0.9) 100%);
      border: 1px solid rgba(255, 215, 0, 0.2);
      color: #E6E6FA;
      box-shadow: 0 4px 20px rgba(75, 0, 130, 0.3);
      
      &::before {
        content: '❝';
        position: absolute;
        top: -10px;
        left: -10px;
        font-size: 2rem;
        color: rgba(255, 215, 0, 0.2);
      }
    `}

    ${props.$personality === 'nullpointer' && css`
      font-family: 'Courier New', monospace;
      background: rgba(0, 0, 0, 0.85);
      color: #00FF41;
      border: 1px dashed #00FF41;
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
      border-radius: 4px;
      
      &:hover {
        animation: ${glitchAnim} 0.3s infinite;
      }

      &::before {
        content: '>_';
        margin-right: 8px;
        color: #FF00FF;
        font-weight: bold;
      }
    `}
  `}
`;

const InputForm = styled.form`
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  color: white;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SendButton = styled.button`
  padding: 0 2rem;
  border-radius: 12px;
  border: none;
  background: ${props => props.disabled ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00BFFF 0%, #0066CC 100%)'};
  color: ${props => props.disabled ? 'rgba(255,255,255,0.3)' : 'white'};
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 191, 255, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const StopButton = styled(SendButton)`
  background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
  
  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(255, 65, 108, 0.3);
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  height: 100%;
  
  span {
    width: 6px;
    height: 6px;
    background-color: currentColor;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const StatusIndicator = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 191, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  height: 1.5em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: ${props => props.$status === 'speaking' ? 'block' : 'none'};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    box-shadow: 0 0 8px currentColor;
  }
`;

const SpeakButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 6px 12px;
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

const OrgChatInterface = () => {
  const { 
    messages, 
    status, 
    emotion,
    stopGeneration,
    inputValue,
    setInputValue,
    handleSendMessage,
    speakText,
    speakingIndex,
    currentPersonality,
    setPersonality,
    personalities,
    isDebateMode,
    toggleDebateMode
  } = useAIChat();
  const messagesEndRef = useRef(null);
  
  const [dims, setDims] = useState({ w: 500, h: 600 });
  const isResizing = useRef(false);
  const resizeDir = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startResize = (e, direction) => {
    e.preventDefault();
    isResizing.current = true;
    resizeDir.current = direction;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    setDims(prev => {
      let newW = prev.w;
      let newH = prev.h;

      if (resizeDir.current === 'left' || resizeDir.current === 'corner') {
        const rightEdge = window.innerWidth * 0.95;
        newW = rightEdge - e.clientX;
      }

      if (resizeDir.current === 'top' || resizeDir.current === 'corner') {
        const centerY = window.innerHeight / 2;
        const distFromCenter = centerY - e.clientY;
        newH = distFromCenter * 2;
      }

      return {
        w: Math.max(300, Math.min(newW, 1000)),
        h: Math.max(200, Math.min(newH, 800))
      };
    });
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <OverlayContainer>
      <ChatBox $width={dims.w} $height={dims.h}>
        <TopHandle onMouseDown={(e) => startResize(e, 'top')} />
        <LeftHandle onMouseDown={(e) => startResize(e, 'left')} />
        <CornerHandle onMouseDown={(e) => startResize(e, 'corner')} />

        <PersonalitySelector>
          {personalities && Object.values(personalities).map(p => (
            <PersonaButton 
              key={p.id} 
              $active={currentPersonality === p.id}
              onClick={() => setPersonality(p.id)}
            >
              {p.name}
            </PersonaButton>
          ))}
          <PersonaButton 
            $active={isDebateMode}
            onClick={toggleDebateMode}
            style={{ 
              marginLeft: 'auto', 
              borderColor: isDebateMode ? '#ff4444' : 'rgba(255,255,255,0.3)', 
              color: isDebateMode ? '#ff4444' : 'rgba(255,255,255,0.6)' 
            }}
            title="Mode Débat Autonome"
          >
            {isDebateMode ? '🛑 Stop' : '⚔️ Débat'}
          </PersonaButton>
        </PersonalitySelector>

        <MessagesArea>
          {messages
            .filter(msg => msg.role !== 'system')
            .map((msg, index) => (
            <MessageBubble 
              key={index} 
              $isUser={msg.role === 'user'}
              $personality={currentPersonality}
            >
              {msg.content}
              {msg.role === 'assistant' && (
                <SpeakButton 
                  onClick={() => speakText(msg.content, index)} 
                  title={speakingIndex === index ? "Arrêter la lecture" : "Lire à voix haute"}
                >
                  {speakingIndex === index ? (
                    <>
                      <svg viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                      Arrêter
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      Écouter
                    </>
                  )}
                </SpeakButton>
              )}
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </MessagesArea>
        
        <StatusIndicator $status={status}>
          {status === 'thinking' && (
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          )}
          {status === 'speaking' && 'AI is speaking...'}
        </StatusIndicator>

        <InputForm onSubmit={handleSendMessage}>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={status === 'thinking' ? "Thinking..." : "Type a message..."}
            disabled={status === 'thinking'}
          />
          {status === 'thinking' ? (
            <StopButton type="button" onClick={stopGeneration}>
              Stop
            </StopButton>
          ) : (
            <SendButton type="submit" disabled={!inputValue.trim() || status === 'thinking'}>
              Send
            </SendButton>
          )}
        </InputForm>
      </ChatBox>
    </OverlayContainer>
  );
};

export default OrgChatInterface;
