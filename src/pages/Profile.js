import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import logo from "../assets/logo-removebg.png"
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
import char12 from "../assets/characters/char12.png"
import char13 from "../assets/characters/char13.png"
import char14 from "../assets/characters/char14.png"

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-family: 'VT323', monospace;
    background: black;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
`

const Header = styled.div`

    width: 100%;
    z-index: 3;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Footer = styled.div`
    width: 100%;
    z-index: 2;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Button = styled.button`
  position: relative;
  width: 180px;
  height: 60px;
  margin: 20px;

  text-transform: uppercase;
  text-align: center;
  color: #fff;
  trasnition: 0.5s;
  background: black;
  font-family: 'VT323', monospace;
  font-size: 24px;

    border: 1px solid #ec1840;
    &:hover {
      border: 1px solid transparent;
      background: #ec1840 url(https://i.postimg.cc/wBXGXbWN/pixel.png); // 360px x 1080px
      transition-delay: 0.8s;
      background-size: 180px;
      animation: animate 0.8s steps(8) forwards;
    }
  }

  @keyframes animate {
    0% {
      background-position-y: 0;
    }
    100% {
      background-position-y: -480px;
    }
  }

  cursor: url(https://cdn.custom-cursor.com/db/7247/32/starter-3d-effect-cursor-pointer.png), pointer;
`

const Button2 = styled.button`
  position: relative;
  width: 180px;
  height: 60px;
  margin: 20px;

  text-transform: uppercase;
  text-align: center;
  color: #fff;
  trasnition: 0.5s;
  background: black;
  font-family: 'VT323', monospace;
  font-size: 24px;

    border: 1px solid #7a18ec;
    &:hover {
      border: 1px solid transparent;
      background: #7a18ec url(https://i.postimg.cc/FzBWFtKM/pixel2.png); 
      transition-delay: 0.8s;
      background-size: 180px;
      animation: animate 0.8s steps(8) forwards;
    }
  }

  @keyframes animate {
    0% {
      background-position-y: 0;
    }
    100% {
      background-position-y: -480px;
    }
  }

  cursor: url(https://cdn.custom-cursor.com/db/7247/32/starter-3d-effect-cursor-pointer.png), pointer;
`

const CharButton = styled.button`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 20px;

  text-transform: uppercase;
  text-align: center;
  color: #fff;
  trasnition: 0.5s;
  background: black;
  font-family: 'VT323', monospace;
  font-size: 24px;

  border: 1px dashed white;

    &:hover {
      border: 1px solid transparent;
      background: white url(https://i.postimg.cc/FzBWFtKM/pixel2.png); 
      color: black;
      background-size: 180px;
    }
  }

  cursor: url(https://cdn.custom-cursor.com/db/7247/32/starter-3d-effect-cursor-pointer.png), pointer;
`

const Logo = styled.img`
  height: 60px;
  margin: 0 20px;
`

const LogoDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    color: white;
    font-size: 50px;
`

const CharacterBody = styled.div`
  z-index: 2;
  transform: scale(2);

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

const IntroBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
    min-height: 100vh;
`

const IntroBodyHalf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 50%;
`

const IntroText = styled.div`
    color: #7a18ec;
    font-size: 60px;
`

const Profile = ({ sign }) => {

  let { id: walletAddress } = useParams()
  const character = [char1, char2, char3, char4, char5, char6, char7, char8, char9, char10, char11, char12, char13, char14]
  const [charIndex, setCharIndex] = useState(1)

  return (
    <Wrapper>
      <Header>
        <LogoDiv >
          <Logo src={logo} />
          dOffice
        </LogoDiv>
        <Link to={"/"} >
          <Button2>Go Home</Button2>
        </Link>
      </Header>

      Hello, Employee <br />
      <span style={{ fontSize: '40px' }} >Let's setup your profile! <br /></span>
      <span style={{ color: 'white', fontSize: '24px' }} >{walletAddress ? walletAddress : "Connect Your Wallet To Register"} <br /></span>

      <IntroBody style={{ marginTop: '-10vh', height: "80vh" }}            >
        <IntroBodyHalf>
          <IntroText>
            Select Avatar <br />
            <span style={{ fontSize: '40px' }} >This is how u will look in dOffice<br /></span>
            <span style={{ color: 'white', fontSize: '24px' }} >This will trigger a blockchain transaction<br /></span>
            <Button2 style={{ marginLeft: 0 }} onClick={() => { sign(`Message: I confirm this character as my avatar in dOffice. \n\nNext: In the next popup you will be asked to pay the gas fees and this will save your avatar on blockchain. \n\nNote: We don't take a single penny out of your salary for this transaction!`) }} >Confirm</Button2>
          </IntroText>
        </IntroBodyHalf>
        <IntroBodyHalf style={{ flexDirection: "row", justifyContent: "space-around" }} >
          <CharButton onClick={() => {
            if (charIndex == 0) {
              setCharIndex(character.length - 1)
            } else {
              setCharIndex(charIndex - 1)
            }
          }} >{"<"}</CharButton>
          <CharacterBody id='character' >
            <div className="character">
              <img id='character-body' className="character_spritesheet pixelart face-down" src={character[charIndex]} alt="Character" />
            </div>
          </CharacterBody>
          <CharButton onClick={() => {
            if (charIndex == character.length - 1) {
              setCharIndex(0)
            } else {
              setCharIndex(charIndex + 1)
            }
          }} >{">"}</CharButton>
        </IntroBodyHalf>
      </IntroBody>

    </Wrapper>
  )
}

export default Profile