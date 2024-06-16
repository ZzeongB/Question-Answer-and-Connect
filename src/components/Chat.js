// Import necessary modules and components
import React, { useState, useEffect, useRef } from "react";
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
const Chat = ({ user, messages, keywords, messagesEndRef, handleClick, messageRefs, clickedMessage}) => {
  const colorKeywordDict = createColorKeywordDict(keywords);

  //const handleClick = (parentId) => {
    // Scroll to the parent message when clicked
    //console.log("Parent ID:", parentId);
  //  if (parentId && messageRefs.current[parentId]) {
  //    console.log("Scrolling to parent message:", parentId);
  //    console.log(messageRefs.current[parentId])
  //    messageRefs.current[parentId].current.scrollIntoView({ behavior: "smooth" });
  //  }
  //};
  useEffect(() => {
    if (clickedMessage) {
      if (clickedMessage && messageRefs.current[clickedMessage].current) {
        messageRefs.current[clickedMessage].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [clickedMessage, messageRefs]);
  return (
    <Wrapper>
      <div className="chat-messages" ref={messagesEndRef}>
        {messages && // Check if messages exist
          messages
            //.slice(-20) // Display only the last 20 messages
            .map((message, idx) => {
              const messageColor = colorKeywordDict[message.tag];
              // Initialize ref for each message

              // Return a SingleChat component for each message
              return (
                <div
                  key={message.id}
                  ref={messageRefs.current[message.id]}
                >
                  <SingleChat
                    key={message.id}
                    index={idx}
                    message={message}
                    user={user}
                    tag = {message.tag}
                    is_question = {message.is_question}
                    parent_id = {message.parent_id}
                    color={messageColor}
                    onClick={() => handleClick(message.id, message.tag)} // Handle click
                  />
                </div>
              );
            })}
      </div>
    </Wrapper>
  );
};

// Export the Chat component
export default Chat;
