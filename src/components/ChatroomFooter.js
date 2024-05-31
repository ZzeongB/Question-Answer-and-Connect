import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: auto;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 70px;
  overflow: auto;
  padding: 6px;
  z-index: 0;
  background-color: white;
  & form {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    & textarea,
    button {
      display: inline-block;
      border: none;
      outline: none;
    }
    & textarea {
      width: 90%;
      resize: none;
      height: 100%;
      margin: 0;
      font-size: 15px;
      padding:10px;
    }
    & button {
      width: 50px;
      height: 30px;
      background: #ffeb33;
      border-radius: 8px;
      position: absolute;
      right: 10px;
      bottom: 3px;
      font-size: 15px;
      &.canSubmit {
        cursor: pointer;
        pointer-events: all;
        color: #000;
      }
      &.cannotSubmit {
        pointer-events: none;
        color: #b4b4b4;
      }
    }
  }
`;

const Footer = ({ onChatSumbmit }) => {
  const [message, setMessage] = useState('');
  // 채팅 내용이 공백이라면, 채팅을 보낼 수 없도록 설정하였습니다.
  const isCanSubmit = !!message.replace(/ |\n/g, '');
  const btnClassName = isCanSubmit ? 'canSubmit' : 'cannotSubmit';
  const onMessageChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setMessage(value);
  };
  const requestSubmit = () => {
    if (isCanSubmit) {
      onChatSumbmit(message);
      setMessage('');
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    requestSubmit();
  };
  const onEnterPress = (event) => {
    // shift + enter 이면 줄바꿈이 되고, enter키만 누르면 채팅 전송이 됩니다.
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      requestSubmit();
    }
  };
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <textarea
          value={message}
          autoFocus={true}
          onChange={onMessageChange}
          onKeyPress={onEnterPress}
        />
        <button className={btnClassName} type="submit">
          전송
        </button>
      </form>
    </Wrapper>
  );
};

export default Footer;