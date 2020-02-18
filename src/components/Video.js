import React from 'react';
import video from '../assets/video/720_CloseUpVideoOfALighthouse.mp4';
import styled from 'styled-components';

const Wrapper = styled.p`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3.5em;
  text-align: center;

  @media only screen and (max-width: 720px) {
    font-size: 1.2em;
    color: black;
    width: 80%;
    margin: 0 auto;
    margin-top: 15%;
    text-align: center;
  }
`

const Dynami = styled.video`
  filter: brightness(50%);
  max-width: 100%;
  max-height: 100%;

  @media only screen and (max-width: 720px) {
    filter: brightness(100%);
  }
`

export default function Video() {
  return (
    <div class="video-container">
      <Dynami autoPlay muted loop controls>
        <source src={video} type="video/mp4" />
      </Dynami>
      <Wrapper>
        <p>Use Nag Me to make your life much better!</p>
      </Wrapper>
    </div>
  )
}