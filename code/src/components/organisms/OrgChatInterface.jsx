import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAIChat } from '../../hooks/useAIChat';

// Styled Components
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 10;
`;

const ChatBox = styled.div`
  position: relative;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  max-width: 95vw;
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

// --- RESIZE HANDLES ---
const Handle = styled.div`
  position: absolute;
  background: transparent;
  z-index: 20;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const RightHandle = styled(Handle)`
  top: 0;
  right: 0;
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
  right: 0;
  width: 20px;
  height: 20px;
  cursor: nesw-resize;
  border-top-right-radius: 24px;
  /* Visual indicator for the corner */
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-top: 2px solid rgba(255,255,255,0.5);
    border-right: 2px solid rgba(255,255,255,0.5);
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
  
  ${props => props.$isUser ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #00BFFF 0%, #0066CC 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.08);
    color: #E0E0E0;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom-left-radius: 4px;
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
    display: ${props => props.$active ? 'block' : 'none'};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    box-shadow: 0 0 8px currentColor;
  }
`;

const OrgChatInterface = () => {
  const { messages, status, inputValue, setInputValue, handleSendMessage } = useAIChat();
  const messagesEndRef = useRef(null);
  
  // Resize State
  const [dims, setDims] = useState({ w: 800, h: 300 });
  const isResizing = useRef(false);
  const resizeDir = useRef(null); // 'right', 'top', 'corner'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- RESIZE LOGIC ---
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

      // Resize Width (Right Handle)
      if (resizeDir.current === 'right' || resizeDir.current === 'corner') {
        // Calculate width based on center alignment
        // Since the box is centered by flexbox, dragging right increases width from center
        // This is tricky with flex center. 
        // Simpler approach: Just track delta X, but since it's centered, 
        // we might need to just use absolute mouse position relative to window center?
        // Let's keep it simple: Dragging right increases width.
        const centerX = window.innerWidth / 2;
        const distFromCenter = e.clientX - centerX;
        newW = distFromCenter * 2; // Symmetric resize
      }

      // Resize Height (Top Handle)
      if (resizeDir.current === 'top' || resizeDir.current === 'corner') {
        // Dragging UP increases height (since it's anchored at bottom)
        const bottomY = window.innerHeight - 40; // Approx padding bottom
        newH = bottomY - e.clientY;
      }

      return {
        w: Math.max(300, Math.min(newW, 1200)),
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
        {/* Handles */}
        <TopHandle onMouseDown={(e) => startResize(e, 'top')} />
        <RightHandle onMouseDown={(e) => startResize(e, 'right')} />
        <CornerHandle onMouseDown={(e) => startResize(e, 'corner')} />

        <MessagesArea>
          {messages
            .filter(msg => msg.role !== 'system')
            .map((msg, index) => (
            <MessageBubble key={index} $isUser={msg.role === 'user'}>
              {msg.content}
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </MessagesArea>
        
        <StatusIndicator $active={status !== 'idle'}>
          {status === 'thinking' && 'AI is thinking...'}
          {status === 'speaking' && 'AI is speaking...'}
        </StatusIndicator>

        <InputForm onSubmit={handleSendMessage}>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={status === 'thinking' || status === 'speaking'}
          />
          <SendButton type="submit" disabled={!inputValue.trim() || status !== 'idle'}>
            Send
          </SendButton>
        </InputForm>
      </ChatBox>
    </OverlayContainer>
  );
};

export default OrgChatInterface;
