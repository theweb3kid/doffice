import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react';

import char1 from "../assets/characters/char1.png"
import char2 from "../assets/characters/char2.png"
import char3 from "../assets/characters/char3.png"
import char4 from "../assets/characters/char4.png"
import char5 from "../assets/characters/char5.png"
import char6 from "../assets/characters/char6.png"
import char7 from "../assets/characters/char7.png"
import char8 from "../assets/characters/char8.png"
import char9 from "../assets/characters/char9.png"
import char10 from "../assets/characters/char10.png"
import char11 from "../assets/characters/char11.png"
import char12 from "../assets/characters/char14.png"
import char13 from "../assets/characters/char13.png"

const CharacterBody = styled.div`
  position: absolute;
  z-index: 2;
  transform: scale(1.1);

  .character {
    width: 15vh;
    height: 15vh;
    overflow: hidden;
    position: relative;
 }
 
 .character_spritesheet {
    animation: moveSpritesheet 1s steps(4) infinite;
    position: relative;
    width: 60vh;
 }
 
 .pixelart {
    image-rendering: pixelated;
 }
 
 .face-right {
    top: -15vh;
 }
 .face-up {
    top: -30vh;
 }
 .face-left {
    top: -45vh;
 }

 .paused {
    animation-play-state: paused;
  } 
 
 @keyframes moveSpritesheet {
    from {
       transform: translate3d(0px,0,0)
    }
    to {
       transform: translate3d(-100%,0,0)
    }
 }
 
`

const Character = ({ charID, restricted }) => {

    let character;

    switch (charID) {
        case 1:
            character = char1;
            break;
        case 2:
            character = char2;
            break;
        case 3:
            character = char3;
            break;
        case 4:
            character = char4;
            break;
        case 5:
            character = char5;
            break;
        case 6:
            character = char6;
            break;
        case 7:
            character = char7;
            break;
        case 8:
            character = char8;
            break;
        case 9:
            character = char9;
            break;
        case 10:
            character = char10;
            break;
        case 11:
            character = char11;
            break;
        case 12:
            character = char12;
            break;
        case 13:
            character = char13;
            break;
    }

    useEffect(() => {
        var up = false,
            right = false,
            down = false,
            left = false,
            x = ((100 - 8) / 2),
            y = ((100 - 16) / 2)

        document.addEventListener('keydown', press)
        function press(e) {
            document.getElementById('character-body').style.animationPlayState = "running"
            if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
                up = true
            }
            if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
                right = true
            }
            if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
                down = true
            }
            if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
                left = true
            }
        }
        document.addEventListener('keyup', release)
        function release(e) {
            document.getElementById('character-body').style.animationPlayState = "paused"
            if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
                up = false
            }
            if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
                right = false
            }
            if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
                down = false
            }
            if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
                left = false
            }
        }
        function moveCharacter() {
            var character = document.getElementById("character")
            if (y <= restricted.top + 8 && x < ((100) / 2) && x >= ((100 - 16) / 2)) {
                console.log("portal3")
            } else if (y <= restricted.top + 8 && x < ((100 - 16) / 2) && x >= ((100 - 32) / 2)) {
                console.log("portal1")
            } else if (y <= restricted.top + 8 && x >= ((100) / 2) && x <= ((100 + 16) / 2)) {
                console.log("portal2")
            }
            if (up) {
                if (y > 0 + restricted.top) {
                    y = y - 0.5
                    document.getElementById('character-body').className = "character_spritesheet pixelart face-up"
                }
            }
            if (right) {
                if (x < 100 - 8 - restricted.right) {
                    x = x + 0.25
                    document.getElementById('character-body').className = "character_spritesheet pixelart face-right"
                }
            }
            if (down) {
                if (y < 100 - 16 - restricted.bottom) {
                    y = y + 0.5
                    document.getElementById('character-body').className = "character_spritesheet pixelart face-down"
                }
            }
            if (left) {
                if (x > 0 + restricted.left) {
                    x = x - 0.25
                    document.getElementById('character-body').className = "character_spritesheet pixelart face-left"
                }
            }
            character.style.left = x + 'vw'
            character.style.top = y + 'vh'
            window.requestAnimationFrame(moveCharacter)
        }
        window.requestAnimationFrame(moveCharacter)
    }, [restricted])

    return (
        <CharacterBody id='character' >
            <div className="character">
                <img id='character-body' className="character_spritesheet paused pixelart face-down" src={character} alt="Character" />
            </div>
        </CharacterBody>
    )
}

export default Character