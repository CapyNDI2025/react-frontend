import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
`;

const GameFrame = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  border: 4px solid #fff;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  background-color: #333;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  display: block;
  image-rendering: pixelated;
  width: 100%;
  height: 100%;
`;

const UIOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`;

const HUD = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  text-shadow: 2px 2px 0 #000;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border: 4px solid #fff;
  text-align: center;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuTitle = styled.h1`
  font-size: 40px;
  color: #ffcc00;
  text-shadow: 4px 4px 0 #000;
  margin: 0 0 20px 0;
`;

const Button = styled.button`
  background: #ff0000;
  color: #fff;
  border: 4px solid #fff;
  padding: 15px 30px;
  font-size: 20px;
  font-family: inherit;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
    background: #ff4444;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Slider = styled.input`
  width: 100%;
  margin-top: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  pointer-events: auto;
`;

const Title = styled.h1`
  font-size: 60px;
  color: #ff0000;
  text-shadow: 4px 4px 0 #fff;
  margin: 0;
`;

class SystemeAudio {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.gainPrincipal = this.ctx.createGain();
        this.gainPrincipal.connect(this.ctx.destination);
        this.volume = 0.5;
        this.gainPrincipal.gain.value = this.volume;

        this.musiqueFond = new Audio(bgMusicUrl);
        this.musiqueFond.loop = true;
        this.musiqueFond.volume = 0.05;
    }

    definirVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        this.gainPrincipal.gain.value = this.volume;
    }

    jouerSon(freq, type, duration, startTime = 0) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);
        osc.connect(gain);
        gain.connect(this.gainPrincipal);
        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    jouerSaut() {
        this.jouerSon(150, 'square', 0.1);
        this.jouerSon(300, 'square', 0.2, 0.1);
    }

    jouerPiece() {
        this.jouerSon(900, 'sine', 0.1);
        this.jouerSon(1200, 'sine', 0.3, 0.05);
    }

    jouerEcrasement() {
        this.jouerSon(100, 'sawtooth', 0.1);
    }

    jouerMort() {
        this.jouerSon(300, 'triangle', 0.2);
        this.jouerSon(200, 'triangle', 0.2, 0.2);
        this.jouerSon(100, 'triangle', 0.4, 0.4);
    }

    jouerPas() {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.gainPrincipal);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.05);
    }

    jouerBlocChance() {
        this.jouerSon(400, 'sine', 0.1);
        this.jouerSon(600, 'sine', 0.1, 0.1);
        this.jouerSon(800, 'sine', 0.1, 0.2);
        this.jouerSon(1000, 'sine', 0.2, 0.3);
    }

    jouerPowerup() {
        this.jouerSon(600, 'square', 0.1);
        this.jouerSon(800, 'square', 0.1, 0.05);
        this.jouerSon(1000, 'square', 0.1, 0.1);
        this.jouerSon(1200, 'square', 0.1, 0.15);
        this.jouerSon(1500, 'square', 0.2, 0.2);
    }

    jouerVictoire() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            this.jouerSon(freq, 'square', 0.2, i * 0.15);
        });
    }

    lancerMusique() {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.musiqueFond.play().catch(e => console.error("Music play failed:", e));
    }

    arreterMusique() {
        this.musiqueFond.pause();
        this.musiqueFond.currentTime = 0;
    }
}

const TAILLE_TUILE = 32;
const GRAVITE = 0.6;
const FORCE_SAUT = -11;
const VITESSE = 4;

import capyStanding from '../assets/images/capyBros/capy_standing.png';
import capyRunning from '../assets/images/capyBros/capy_running.png';
import capyRunning2 from '../assets/images/capyBros/capy_running2.png';
import capyJumping from '../assets/images/capyBros/capy_jumping.png';
import capy4Pattes from '../assets/images/capyBros/capy_4_pattes.png';
import groundImg from '../assets/images/capyBros/ground.png';
import brickImg from '../assets/images/capyBros/brick.png';
import enemyImg from '../assets/images/capyBros/enemy.png';
import turtleImg from '../assets/images/capyBros/turtle.png';
import turtle2Img from '../assets/images/capyBros/turtle2.png';
import spikeImg from '../assets/images/capyBros/spike.png';
import luckyBlockImg from '../assets/images/capyBros/lucky_block.png';
import goodMushroomImg from '../assets/images/capyBros/good_mushroom.png';
import usedBlockImg from '../assets/images/capyBros/used_block.png';
import bgLayer from '../assets/images/capyBros/bg_layer.png';
import castleImg from '../assets/images/capyBros/castle.png';
import coinImg from '../assets/images/capyBros/coin.png';
import bgMusicUrl from '../assets/music/funny-80x27s-arcade-game-outro-430593.mp3';

const RESSOURCES = {
    capyStanding,
    capyRunning,
    capyRunning2,
    capyJumping,
    capy4Pattes,
    ground: groundImg,
    brick: brickImg,
    enemy: enemyImg,
    turtle: turtleImg,
    turtle2: turtle2Img,
    spike: spikeImg,
    luckyBlock: luckyBlockImg,
    goodMushroom: goodMushroomImg,
    usedBlock: usedBlockImg,
    bg: bgLayer,
    castle: castleImg,
    coin: coinImg
};

class MoteurJeu {
    constructor(canvas, audio, definirStats, definirEtatJeu) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.audio = audio;
        this.definirStats = definirStats;
        this.definirEtatJeu = definirEtatJeu;

        this.images = {};
        this.touches = {};

        this.etat = 'MENU';
        this.camera = { x: 0, y: 0 };

        this.joueur = { x: 100, y: 100, vx: 0, vy: 0, w: 24, h: 24, grounded: false, dead: false };
        this.carte = [];
        this.ennemis = [];
        this.particules = [];

        this.score = 0;
        this.pieces = 0;

        this.chronoAnim = 0;
        this.frameAnim = 0;

        this.idBoucle = null;
        this.dernierTemps = 0;

        this.lierEntrees();
    }

    lierEntrees() {
        window.addEventListener('keydown', e => {
            this.touches[e.code] = true;
            if (e.code === 'KeyP') {
                this.debugMode = !this.debugMode;
            }
        });
        window.addEventListener('keyup', e => this.touches[e.code] = false);
    }

    async chargerRessources() {
        const promises = Object.entries(RESSOURCES).map(([key, src]) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.images[key] = img;
                    resolve();
                };
                img.onerror = (e) => {
                    resolve();
                };
            });
        });
        await Promise.all(promises);
        this.initialiserNiveau();
    }

    initialiserNiveau() {
        this.carte = [];
        const largeurNiveau = 300;
        const solY = 18;

        for (let y = 0; y < 20; y++) {
            this.carte[y] = new Array(largeurNiveau).fill(0);
        }

        const remplirRect = (x, y, w, h, tuile) => {
            for (let iy = y; iy < y + h; iy++) {
                for (let ix = x; ix < x + w; ix++) {
                    if (iy >= 0 && iy < 20 && ix >= 0 && ix < largeurNiveau) {
                        this.carte[iy][ix] = tuile;
                    }
                }
            }
        };

        remplirRect(0, solY, 40, 2, 1);

        for (let i = 0; i < 3; i++) {
            remplirRect(40 + i, solY - 1 - i, 1, 1 + i, 2);
        }
        remplirRect(43, solY - 3, 10, 1, 2);
        for (let i = 0; i < 3; i++) {
            remplirRect(53 + i, solY - 3 + i, 1, 3 - i, 2);
        }
        remplirRect(56, solY, 16, 2, 1);

        for (let i = 0; i < 5; i++) {
            remplirRect(72 + i, solY - 1 - i, 1, 1 + i, 2);
        }
        remplirRect(77, solY - 5, 10, 1, 2);
        for (let i = 0; i < 5; i++) {
            remplirRect(87 + i, solY - 5 + i, 1, 5 - i, 2);
        }
        remplirRect(92, solY, 10, 2, 1);

        remplirRect(102, solY, 5, 2, 0);
        remplirRect(104, solY - 2, 3, 1, 2);

        remplirRect(107, solY, 20, 2, 1);

        remplirRect(127, solY, 13, 2, 1);

        this.carte[solY][130] = 3;
        this.carte[solY][131] = 3;

        for (let i = 0; i < 5; i++) {
            remplirRect(140 + i, solY - 1 - i, 1, 1 + i, 2);
        }
        remplirRect(145, solY - 5, 30, 1, 2);

        this.carte[solY - 9][150] = 4;

        this.carte[solY - 6][160] = 3;

        remplirRect(140, solY, 40, 2, 1);
        this.carte[solY - 1][160] = 3;

        remplirRect(180, solY, 15, 2, 1);
        this.carte[solY - 1][185] = 8;
        this.carte[solY - 1][190] = 8;

        remplirRect(198, solY, 15, 2, 1);
        this.carte[solY - 1][205] = 3;
        this.carte[solY - 1][200] = 8;
        this.carte[solY - 1][210] = 8;

        remplirRect(217, solY, 13, 2, 1);
        this.carte[solY - 1][221] = 3;
        this.carte[solY - 1][227] = 3;
        this.carte[solY - 1][224] = 8;

        remplirRect(233, solY, 3, 2, 1);

        remplirRect(238, solY - 2, 3, 1, 2);
        this.carte[solY - 3][239] = 8;

        remplirRect(244, solY, 4, 2, 1);

        this.carte[solY - 1][10] = 8;
        this.carte[solY - 1][15] = 8;
        this.carte[solY - 1][45] = 8;
        this.carte[solY - 6][77] = 8;
        this.carte[solY - 4][104] = 8;
        this.carte[solY - 6][145] = 8;
        this.carte[solY - 6][152] = 8;

        remplirRect(250, solY, 50, 2, 1);

        this.ennemis = [
            { x: 260 * TAILLE_TUILE, y: (solY - 5) * TAILLE_TUILE, w: 100, h: 100, vx: 0, type: 99, dead: false },

            { x: 300, y: 400, w: 32, h: 32, vx: -1, type: 0, dead: false },

            { x: 45 * TAILLE_TUILE, y: 400, w: 32, h: 32, vx: -1, type: 0, dead: false },

            { x: 80 * TAILLE_TUILE, y: 300, w: 32, h: 32, vx: -1, type: 1, dead: false },
            { x: 95 * TAILLE_TUILE, y: 400, w: 32, h: 32, vx: -1, type: 0, dead: false },

            { x: 135 * TAILLE_TUILE, y: 400, w: 32, h: 32, vx: -1, type: 1, dead: false },

            { x: 150 * TAILLE_TUILE, y: 300, w: 32, h: 32, vx: -1, type: 1, dead: false },

            { x: 165 * TAILLE_TUILE, y: 500, w: 32, h: 32, vx: -1, type: 0, dead: false },

            { x: 208 * TAILLE_TUILE, y: 400, w: 32, h: 32, vx: -1, type: 1, dead: false },
            { x: 225 * TAILLE_TUILE, y: 400, w: 32, h: 32, vx: -1, type: 1, dead: false },
            { x: 240 * TAILLE_TUILE, y: (solY - 3) * TAILLE_TUILE, w: 32, h: 32, vx: 0, type: 1, dead: false },
        ];

        this.joueur = { x: 100, y: 400, vx: 0, vy: 0, w: 24, h: 24, grounded: false, dead: false, lives: 1, isBig: false, invulnerableUntil: 0 };
        this.score = 0;
        this.pieces = 0;
        this.camera.x = 0;
    }

    demarrer() {
        this.etat = 'PLAYING';
        this.dernierTemps = performance.now();
        this.audio.lancerMusique();
        this.boucle();
    }

    arreter() {
        cancelAnimationFrame(this.idBoucle);
        this.etat = 'MENU';
        this.audio.arreterMusique();
    }

    mettreAJour(dt) {
        if (this.etat !== 'PLAYING') return;

        if (this.touches['ArrowRight'] || this.touches['KeyD']) this.joueur.vx += 0.5;
        else if (this.touches['ArrowLeft'] || this.touches['KeyA']) this.joueur.vx -= 0.5;
        else this.joueur.vx *= 0.8;

        if ((this.touches['Space'] || this.touches['ArrowUp']) && this.joueur.grounded) {
            this.joueur.vy = FORCE_SAUT;
            this.joueur.grounded = false;
            this.audio.jouerSaut();
        }

        this.joueur.vx = Math.max(Math.min(this.joueur.vx, VITESSE), -VITESSE);
        this.joueur.vy += GRAVITE;

        this.joueur.x += this.joueur.vx;
        this.verifierCollision(this.joueur, 'x');
        this.joueur.y += this.joueur.vy;
        this.verifierCollision(this.joueur, 'y');

        if (Math.abs(this.joueur.vx) > 0.1 && this.joueur.grounded) {
            this.chronoAnim += dt * 16.66;
            if (this.chronoAnim > 150) {
                this.chronoAnim = 0;
                this.frameAnim = (this.frameAnim + 1) % 2;
                this.audio.jouerPas();
            }
        } else {
            this.frameAnim = 0;
            this.chronoAnim = 0;
        }

        const pCx = Math.floor((this.joueur.x + this.joueur.w / 2) / TAILLE_TUILE);
        const pCy = Math.floor((this.joueur.y + this.joueur.h / 2) / TAILLE_TUILE);
        if (this.carte[pCy] && this.carte[pCy][pCx] === 8) {
            this.carte[pCy][pCx] = 0;
            this.pieces++;
            this.score += 50;
            this.audio.jouerPiece();
        }

        this.camera.x = this.joueur.x - 300;
        if (this.camera.x < 0) this.camera.x = 0;

        this.ennemis.forEach(e => {
            if (e.dead) return;
            e.vy = (e.vy || 0) + GRAVITE;

            if (e.type !== 99 && e.type !== 2) {
                const lookAheadX = e.vx > 0 ? e.x + e.w + 5 : e.x - 5;
                const gridX = Math.floor(lookAheadX / TAILLE_TUILE);
                const gridY = Math.floor((e.y + e.h + 1) / TAILLE_TUILE);

                if (this.carte[gridY]) {
                    const tileAhead = this.carte[gridY][gridX];
                    if (!tileAhead || tileAhead === 0 || tileAhead === 3) {
                        e.vx = -e.vx;
                    }
                } else {
                    e.vx = -e.vx;
                }
            }

            e.x += e.vx;
            this.verifierCollision(e, 'x');
            if (e.vx === 0) e.vx = -e.vx;

            e.y += e.vy;
            this.verifierCollision(e, 'y');

            if (e.y > 800) e.dead = true;

            if (this.verifierChevauchement(this.joueur, e)) {
                if (e.type === 2) {
                    e.dead = true;
                    this.joueur.lives = Math.min(this.joueur.lives + 1, 2);
                    this.joueur.isBig = true;
                    this.score += 1000;
                    this.audio.jouerPowerup();
                    return;
                }

                if (e.type === 99) {
                    this.etat = 'GAMEWON';
                    this.definirEtatJeu('GAMEWON');
                    this.audio.jouerVictoire();
                    this.audio.arreterMusique();
                    return;
                }

                if (this.joueur.vy > 0 && this.joueur.y < e.y) {
                    e.dead = true;
                    this.joueur.vy = -5;
                    this.score += 100;
                    this.audio.jouerEcrasement();
                } else {
                    if (this.joueur.invulnerableUntil > performance.now()) return;

                    if (this.joueur.isBig || this.joueur.lives > 1) {
                        this.joueur.isBig = false;
                        this.joueur.lives--;
                        this.joueur.vy = -5;
                        this.joueur.invulnerableUntil = performance.now() + 2000;
                    } else {
                        this.joueur.dead = true;
                        this.audio.jouerMort();
                        this.etat = 'GAMEOVER';
                        this.definirEtatJeu('GAMEOVER');
                        this.audio.arreterMusique();
                    }
                }
            }
        });

        if (this.joueur.y > 800) {
            this.joueur.dead = true;
            this.audio.jouerMort();
            this.etat = 'GAMEOVER';
            this.definirEtatJeu('GAMEOVER');
            this.audio.arreterMusique();
        }

        this.definirStats({ score: this.score, coins: this.pieces });
    }

    verifierCollision(entity, axis) {
        const left = Math.floor(entity.x / TAILLE_TUILE);
        const right = Math.floor((entity.x + entity.w) / TAILLE_TUILE);
        const top = Math.floor(entity.y / TAILLE_TUILE);
        const bottom = Math.floor((entity.y + entity.h) / TAILLE_TUILE);

        const originalVx = entity.vx;

        for (let y = top; y <= bottom; y++) {
            for (let x = left; x <= right; x++) {
                if (this.carte[y] && this.carte[y][x] > 0) {
                    const tileType = this.carte[y][x];
                    const tileX = x * TAILLE_TUILE;
                    const tileY = y * TAILLE_TUILE;

                    if (tileType === 3) {
                        if (entity === this.joueur) {
                            if (this.joueur.invulnerableUntil > performance.now()) return;

                            if (this.joueur.isBig || this.joueur.lives > 1) {
                                this.joueur.isBig = false;
                                this.joueur.lives--;
                                this.joueur.vy = -5;
                                this.joueur.invulnerableUntil = performance.now() + 2000;
                            } else {
                                this.joueur.dead = true;
                                this.audio.jouerMort();
                                this.etat = 'GAMEOVER';
                                this.definirEtatJeu('GAMEOVER');
                                this.audio.arreterMusique();
                            }
                        }
                        continue;
                    }

                    if (tileType === 8) {
                        continue;
                    }

                    if (axis === 'x') {
                        if (entity.vx > 0) entity.x = tileX - entity.w - 0.1;
                        else if (entity.vx < 0) entity.x = tileX + TAILLE_TUILE + 0.1;
                        entity.vx = 0;

                        if (entity !== this.joueur && originalVx !== 0) {
                            entity.vx = -originalVx;
                        }
                    } else {
                        if (entity.vy > 0) {
                            entity.y = tileY - entity.h - 0.1;
                            entity.grounded = true;
                        }
                        else if (entity.vy < 0) {
                            entity.y = tileY + TAILLE_TUILE + 0.1;
                            if (tileType === 4 && entity === this.joueur) {
                                this.carte[y][x] = 5;
                                this.ennemis.push({
                                    x: tileX,
                                    y: tileY - 32,
                                    w: 32,
                                    h: 32,
                                    vx: 2,
                                    vy: -5,
                                    type: 2,
                                    dead: false
                                });
                                this.audio.jouerBlocChance();
                            }
                        }
                        entity.vy = 0;
                    }
                    return;
                }
            }
        }
        if (axis === 'y' && entity.vy > 0) entity.grounded = false;
    }

    verifierChevauchement(a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    dessiner() {
        if (this.images.bg) {
            this.ctx.drawImage(this.images.bg, 0, 0, 800, 600);
        } else {
            this.ctx.fillStyle = '#5c94fc';
            this.ctx.fillRect(0, 0, 800, 600);
        }

        this.ctx.save();
        this.ctx.translate(-Math.floor(this.camera.x), 0);

        for (let y = 0; y < 20; y++) {
            for (let x = Math.floor(this.camera.x / TAILLE_TUILE); x < Math.floor((this.camera.x + 800) / TAILLE_TUILE) + 1; x++) {
                if (this.carte[y] && this.carte[y][x] > 0) {
                    const tileType = this.carte[y][x];
                    let img = null;
                    if (tileType === 1) img = this.images.ground;
                    else if (tileType === 2) img = this.images.brick;
                    else if (tileType === 3) img = this.images.spike;
                    else if (tileType === 4) img = this.images.luckyBlock;
                    else if (tileType === 5) img = this.images.usedBlock;
                    else if (tileType === 8) img = this.images.coin;

                    if (img) {
                        this.ctx.drawImage(img, x * TAILLE_TUILE, y * TAILLE_TUILE, TAILLE_TUILE, TAILLE_TUILE);
                    } else {
                        this.ctx.fillStyle = tileType === 1 ? '#8B4513' : '#B8860B';
                        this.ctx.fillRect(x * TAILLE_TUILE, y * TAILLE_TUILE, TAILLE_TUILE, TAILLE_TUILE);
                    }
                }
            }
        }

        let playerSprite = this.images.capyStanding;

        if (!this.joueur.grounded) {
            playerSprite = this.images.capyJumping || playerSprite;
        } else if (this.touches['ArrowDown']) {
            playerSprite = this.images.capy4Pattes || playerSprite;
        } else if (Math.abs(this.joueur.vx) > 0.1) {
            playerSprite = this.frameAnim === 0 ? this.images.capyRunning : this.images.capyRunning2;
            playerSprite = playerSprite || this.images.capyRunning;
        }

        const playerSize = this.joueur.isBig ? 80 : 60;

        this.ctx.save();

        if (this.joueur.invulnerableUntil > performance.now()) {
            if (Math.floor(performance.now() / 100) % 2 === 0) {
                this.ctx.globalAlpha = 0.5;
            }
        }

        if (this.joueur.vx < 0) {
            this.ctx.translate(this.joueur.x + this.joueur.w, this.joueur.y);
            this.ctx.scale(-1, 1);
            if (playerSprite) {
                const offset = (24 - playerSize) / 2;
                this.ctx.drawImage(playerSprite, offset, offset, playerSize, playerSize);
            }
        } else {
            if (playerSprite) {
                const offset = (24 - playerSize) / 2;
                this.ctx.drawImage(playerSprite, this.joueur.x + offset, this.joueur.y + offset, playerSize, playerSize);
            }
        }

        if (!playerSprite) {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(this.joueur.x, this.joueur.y, this.joueur.w, this.joueur.h);
        }
        this.ctx.restore();

        this.ennemis.forEach(e => {
            if (!e.dead) {
                let enemyImg = this.images.enemy;
                if (e.type === 1) {
                    enemyImg = e.vx > 0 ? this.images.turtle2 : this.images.turtle;
                }
                else if (e.type === 2) enemyImg = this.images.goodMushroom;
                else if (e.type === 99) enemyImg = this.images.castle;

                if (enemyImg) {
                    let size = 50;
                    let offset = -9;
                    if (e.type === 2) {
                        size = 32;
                        offset = 0;
                    }
                    if (e.type === 99) {
                        size = 160;
                        offset = -30;
                    }
                    this.ctx.drawImage(enemyImg, e.x + offset, e.y + offset, size, size);
                } else {
                    this.ctx.fillStyle = e.type === 1 ? 'green' : 'red';
                    this.ctx.fillRect(e.x, e.y, e.w, e.h);
                }
            }
        });

        this.ctx.restore();
    }

    boucle() {
        if (this.etat !== 'PLAYING') return;
        const now = performance.now();
        const dt = (now - this.dernierTemps) / 16.66;
        this.dernierTemps = now;

        this.mettreAJour(dt);
        this.dessiner();
        this.idBoucle = requestAnimationFrame(() => this.boucle());
    }
}

const MarioCapyGame = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const audioRef = useRef(null);
    const [gameState, setGameState] = useState('MENU');
    const [stats, setStats] = useState({ score: 0, coins: 0 });
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        audioRef.current = new SystemeAudio();
        const engine = new MoteurJeu(canvasRef.current, audioRef.current, setStats, setGameState);
        engineRef.current = engine;
        engine.chargerRessources();

        return () => engine.arreter();
    }, []);

    const handleStart = () => {
        audioRef.current.definirVolume(volume);
        engineRef.current.initialiserNiveau();
        engineRef.current.demarrer();
        setGameState('PLAYING');
    };

    const handleVolume = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (audioRef.current) audioRef.current.definirVolume(v);
    };

    const handleQuit = () => {
        engineRef.current.arreter();
        setGameState('MENU');
    };

    return (
        <GameContainer>
            <GameFrame>
                <Canvas ref={canvasRef} width={800} height={600} />

                <UIOverlay>
                    <HUD>
                        <div>SCORE {stats.score}</div>
                        <div>COINS {stats.coins}</div>
                    </HUD>
                </UIOverlay>

                {gameState === 'MENU' && (
                    <MenuContainer>
                        <MenuTitle>CAPY ADVENTURE</MenuTitle>
                        <Button onClick={handleStart}>START GAME</Button>
                        <div>
                            <label>VOLUME</label>
                            <Slider type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} />
                        </div>
                    </MenuContainer>
                )}

                {gameState === 'GAMEOVER' && (
                    <MenuContainer>
                        <MenuTitle>GAME OVER</MenuTitle>
                        <Button onClick={handleStart}>TRY AGAIN</Button>
                        <Button onClick={handleQuit}>MAIN MENU</Button>
                    </MenuContainer>
                )}

                {gameState === 'GAMEWON' && (
                    <MenuContainer>
                        <MenuTitle>YOU WIN!</MenuTitle>
                        <Button onClick={handleStart}>PLAY AGAIN</Button>
                        <Button onClick={handleQuit}>MAIN MENU</Button>
                    </MenuContainer>
                )}
            </GameFrame>
        </GameContainer>
    );
};

export default MarioCapyGame;
