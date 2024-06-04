// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { SingleChat } from "./SingleChat";
import styled from "styled-components";

// Define a styled component for the chat wrapper
const Wrapper = styled.main`
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: auto;
  width: 100%;
  padding-bottom: 100px;
  background-color: #F5F6F7;
  `;

const createColorKeywordDict = (keywords) => {
  return Object.entries(keywords).reduce((acc, [key, value]) => {
    acc[key] = value.backgroundColor;
    return acc;
  }, {});
};

// Define the Chat component
const Chat = ({ user, messages, keywords }) => {
  const colorKeywordDict = createColorKeywordDict(keywords);
  return (
    <Wrapper>
      <div className="chat-messages">
        {messages && // Check if messages exist
          messages
            //.slice(-20) // Display only the last 20 messages
            .map((message, idx) => {
              const messageColor = colorKeywordDict[message.tag];

              // Return a SingleChat component for each message
              return (
                <SingleChat
                  key={message.id}
                  index={idx}
                  message={message}
                  user={user}
                  tag = {message.tag}
                  is_question = {message.is_question}
                  parent_id = {message.parent_id}
                  color={messageColor}
                />
              );
            })}
      </div>
    </Wrapper>
  );
};

// Export the Chat component
export default Chat;
