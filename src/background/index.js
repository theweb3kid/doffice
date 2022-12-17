import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: calc(100vh - 10px - 10vh);
  width: calc(100vw - 10px - 10vw);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #5be45a;
  border: 5px solid #7275b8;
  border-radius: 15px;

    image-rendering: pixelated;
    background-image: url("https://assets.codepen.io/21542/CameraDemoMap.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
 }
`

const Background = () => {
    return (
        <Wrapper className="map pixel-art" >
        </Wrapper>
    )
}

export default Background