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

const TopBar = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: white;
  overflow-x: auto; // Allows horizontal scrolling if tags overflow
  white-space: nowrap; // Prevents tags from wrapping
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
  const observer = useRef(null);
  const [visibleTags, setVisibleTags] = useState(new Set());

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

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const messageTag = entry.target.getAttribute('data-tag');
          if (entry.isIntersecting) {
            setVisibleTags((prevTags) => new Set([...prevTags, messageTag]));
          } else {
            setVisibleTags((prevTags) => {
              const updatedTags = new Set(prevTags);
              updatedTags.delete(messageTag);
              return updatedTags;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentObserver = observer.current;

    messages.forEach((message) => {
      if (messageRefs.current[message.id] && messageRefs.current[message.id].current) {
        currentObserver.observe(messageRefs.current[message.id].current);
      }
    });

    return () => {
      currentObserver.disconnect();
    };
  }, [messages, messageRefs]);

  return (
    <>
    <TopBar>
        Visible Tags:
        {Array.from(visibleTags).map((tag, index) => (
          <span key={index} style={{ marginLeft: '10px' }}>{tag}</span>
        ))}
      </TopBar>
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
                  data-id={message.id}
                  data-tag={message.tag}
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
    </>
  );
};

// Export the Chat component
export default Chat;
