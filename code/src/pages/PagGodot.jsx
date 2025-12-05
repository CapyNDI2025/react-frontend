import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
`

const GameIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

const PagGodot = () => {
  return (
    <GameContainer>
      <GameIframe
        src="/godot/museum.html"
        title="Godot Game"
        allow="autoplay; fullscreen; gamepad; clipboard-write"
        allowFullScreen
      />
    </GameContainer>
  );
};

export default PagGodot;