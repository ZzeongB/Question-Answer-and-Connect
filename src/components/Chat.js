import React, { useState, useEffect } from "react";
import example from "../data/MathDNN.json";
import { SingleChat } from "./ChatBlock";
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.main`
  position: relative;
  top: 50px;
  bottom: 65px;
  left: 0px;
  right: 0px;
  overflow: auto;
  width: 100%;
  background-color: #ffffff;
`;

const Chat = ({ user, messages }) => {
  return (
    <Wrapper>
      <div className="chat-messages">
        {messages &&
          messages
            .slice(-20) // Display only the last 20 messages
            .map((idx, message) => {
              // key is the index of the message
              console.log(message, idx);
              return <SingleChat index={idx} message={messages[message]} />;
            })}
      </div>
    </Wrapper>
  );
};

export default Chat;
