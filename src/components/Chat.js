// Import necessary modules and components
import React, { useState, useEffect } from "react";
import example from "../data/MathDNN.json";
import { SingleChat } from "./ChatBlock";
import styled from "styled-components";
import axios from "axios";

// Define a styled component for the chat wrapper
const Wrapper = styled.main`
  position: fixed;
  top: 50px;
  bottom: 65px;
  left: 0px;
  right: 0px;
  overflow: auto;
  width: 100%;
  background-color: #ffffff;
`;

// Define the Chat component
const Chat = ({ user, messages }) => {
  console.log("messages", messages.slice(-20))
  return (
    <Wrapper>
      <div className="chat-messages">
        {messages && // Check if messages exist
          messages
            .slice(-20) // Display only the last 20 messages
            .map((message, idx) => {
              // Return a SingleChat component for each message
              return <SingleChat key = {message.id} index={idx} message={message} />;
            })}
      </div>
    </Wrapper>
  );
};

// Export the Chat component
export default Chat;