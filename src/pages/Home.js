import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import logo from "../assets/logo-removebg.png"
import char2 from "../assets/characters/char2.png"
import char4 from "../assets/characters/char4.png"
import char11 from "../assets/characters/char11.png"

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-family: 'VT323', monospace;
    background: black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
`

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Footer = styled(motion.div)`
    width: 100%;
    z-index: 2;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Button = styled(motion.button)`
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

const Button2 = styled(motion.button)`
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

const IntroBody = styled(motion.div)`
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

const Home = ({ connect, disconnect, sign, walletAddress }) => {
    return (
        <AnimatePresence>
            <Wrapper>
                <Header>
                    <LogoDiv >
                        <Logo src={logo} />
                        dOffice
                    </LogoDiv>
                    {walletAddress ?
                        <Button onClick={disconnect} >Logout</Button> :
                        <Button2 onClick={connect} >Login</Button2>}
                </Header>
                <IntroBody style={{ marginTop: '10vh', height: "80vh" }}
                    initial={{ scale: 0.7 }} whileInView={{ scale: 1 }} exit={{ scale: 0.7 }}
                >
                    <IntroBodyHalf>
                        <IntroText>
                            Hello, Employee <br />
                            <span style={{ fontSize: '40px' }} >Let's get some work sorted! <br /></span>
                            <span style={{ color: 'white', fontSize: '24px' }} >{walletAddress ? walletAddress : "Connect Your Wallet To Join"} <br /></span>
                            {walletAddress ?
                                <Link to={`profile/employee/${walletAddress}`} initial={{ scale: 0 }} whileInView={{ scale: 1 }} exit={{ scale: 0 }} >
                                    <Button2 style={{ marginLeft: 0 }} >Profile</Button2>
                                </Link>
                                : ""
                            }
                        </IntroText>
                    </IntroBodyHalf>
                    <IntroBodyHalf>
                        <CharacterBody id='character' >
                            <div className="character">
                                <img id='character-body' className="character_spritesheet pixelart face-down" src={char2} alt="Character" />
                            </div>
                        </CharacterBody>
                    </IntroBodyHalf>
                </IntroBody>

                <IntroBody style={{ marginTop: '-20vh', height: "80vh" }}
                    initial={{ scale: 0.7 }} whileInView={{ scale: 1 }} exit={{ scale: 0.7 }}
                >
                    <IntroBodyHalf>
                        <CharacterBody id='character' >
                            <div className="character">
                                <img id='character-body' className="character_spritesheet pixelart face-right" src={char4} alt="Character" />
                            </div>
                        </CharacterBody>
                    </IntroBodyHalf>
                    <IntroBodyHalf>
                        <IntroText style={{ color: "#ec1840" }}>
                            What we ship? huh... <br />
                            <span style={{ fontSize: '32px', }} >Decentralization that your office needs<br /></span>
                            <span style={{ color: 'white', fontSize: '24px' }} >become a proper web3 office today <br /></span>
                            <Link to={`join/office`} >
                                <Button style={{ marginLeft: "0" }} >Join</Button>
                            </Link>
                        </IntroText>
                    </IntroBodyHalf>
                </IntroBody>

                <IntroBody style={{ marginTop: '-10vh', height: "80vh" }}
                    initial={{ scale: 0.7 }} whileInView={{ scale: 1 }} exit={{ scale: 0.7 }}
                >
                    <IntroBodyHalf>
                        <IntroText>
                            Feature list? here... <br />
                            <span style={{ color: 'white', fontSize: '24px' }} >metaverse meets, ipfs file storage, on-chain proposals<br /></span>
                            <span style={{ color: 'white', fontSize: '24px' }} >more and more crazy stuff coomming up<br /></span>
                            <Link to={`explore`} >
                                <Button2 style={{ marginLeft: "0" }} >Explore</Button2>
                            </Link>
                        </IntroText>
                    </IntroBodyHalf>
                    <IntroBodyHalf>
                        <CharacterBody id='character' >
                            <div className="character">
                                <img id='character-body' className="character_spritesheet pixelart face-left" src={char11} alt="Character" />
                            </div>
                        </CharacterBody>
                    </IntroBodyHalf>
                </IntroBody>

                <Footer initial={{ opacity: 0.5 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} >
                    <LogoDiv style={{ fontSize: "30px", margin: "50px" }} >
                        created-by: <a href={'https://twitter.com/ojasrajankar'}> @ojasrajankar</a>
                    </LogoDiv>
                </Footer>
            </Wrapper>
        </AnimatePresence>
    )
}

export default Home