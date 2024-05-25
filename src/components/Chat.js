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
  background-color: rgb(205, 223, 223);
  padding-bottom: 60px;
  `;

// Define the Chat component
const Chat = ({ user, messages }) => {
  console.log("chat");
  return (
    <Wrapper>
      <div className="chat-messages">
        {messages && // Check if messages exist
          messages
            //.slice(-20) // Display only the last 20 messages
            .map((message, idx) => {
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
                />
              );
            })}
      </div>
    </Wrapper>
  );
};

// Export the Chat component
export default Chat;
