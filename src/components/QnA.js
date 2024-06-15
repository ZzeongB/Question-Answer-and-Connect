import React, { useState, useEffect } from "react";
import SingleQnA from "./SingleQnA"; // Ensure this import is correct
import styled from "styled-components";

const Wrapper = styled.main`
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: auto;
  width: 100%;
  background-color: #F5F6F7;
  padding-bottom: 100px;
  
  `;

const createColorKeywordDict = (keywords) => {
  return Object.entries(keywords).reduce((acc, [key, value]) => {
    acc[key] = value.backgroundColor;
    return acc;
  }, {});
};

const QnA = ({ user, messages, keywords, messagesEndRef, messageRefs, clickedMessage}) => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [hasRendered, setHasRendered] = useState(false); // State to track if component has rendered

  const colorKeywordDict = createColorKeywordDict(keywords);

  useEffect(() => {
    if (clickedMessage) {
      const clickedMsg = messages.find(message => message.id === clickedMessage);
      const parentId = clickedMsg.is_question ? clickedMsg.id : clickedMsg.parent_id;
      if (parentId && !selectedQuestionIds.includes(parentId)) {
        setSelectedQuestionIds(prevSelectedIds => [...prevSelectedIds, parentId]);
      }
    }
  }, [clickedMessage, messages]);


  useEffect(() => {
    if (clickedMessage) {
      const clickedMsg = messages.find(message => message.id === clickedMessage);
      const parentId = clickedMsg.is_question ? clickedMsg.id : clickedMsg.parent_id;
      
      if (parentId && messageRefs.current[parentId].current) {
        messageRefs.current[parentId].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [clickedMessage, messageRefs]);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestionIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(questionId)) {
        // Remove the question ID if it is already selected
        return prevSelectedIds.filter(id => id !== questionId);
      } else {
        // Add the question ID if it is not selected
        return [...prevSelectedIds, questionId];
      }
    });
  };

  // Group messages by their parent_id
  const groupedMessages = messages.reduce((acc, message) => {
    if (message.is_question && !message.parent_id) {
      acc[message.id] = [message]; // Initialize with the question itself
    } else if (message.parent_id) {
      if (!acc[message.parent_id]) {
        acc[message.parent_id] = [];
      }
      acc[message.parent_id].push(message);
    }
    return acc;
  }, {});

  // Flatten the grouped messages, ensuring answers follow their respective question
  const flattenedMessages = Object.keys(groupedMessages).reduce((acc, key) => {
    const questionWithAnswers = groupedMessages[key];
    acc.push(...questionWithAnswers);
    return acc;
  }, []);

  return (
    <Wrapper>
      <div className="chat-messages" ref={messagesEndRef}>
      {flattenedMessages.map((message, idx) => {
        if (message.is_question && !message.parent_id) {
          const messageColor = colorKeywordDict[message.tag];
          return (
            <div
                  key={message.id}
                  ref={messageRefs.current[message.id]}
            >
            <SingleQnA
                key={message.id}
                index={idx}
                message={message}
                user={user}
                tag={message.tag}
                is_question={message.is_question}
                onClick={() => handleQuestionClick(message.id)}
                color={messageColor}
                number={groupedMessages[message.id].length-1}
              />
            </div>
            );
          } else if (selectedQuestionIds.includes(message.parent_id)) {
            const messageColor = colorKeywordDict[message.tag];
            return (
              <div
                key={message.id}
                ref={messageRefs.current[message.id]}
              >   
              <SingleQnA
                key={message.id}
                index={idx}
                message={message}
                user={user}
                tag={message.tag}
                is_question={message.is_question}
                color={messageColor}
              />
              </div>
            );
          } else {
              return null;
            }
          })}
      </div>
    </Wrapper>
  );
};

export default QnA;
