import React, { useState } from "react";
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
  padding-bottom: 60px;
  
  `;

const createColorKeywordDict = (keywords) => {
  return Object.entries(keywords).reduce((acc, [key, value]) => {
    acc[key] = value.backgroundColor;
    return acc;
  }, {});
};

const QnA = ({ user, messages, keywords }) => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const colorKeywordDict = createColorKeywordDict(keywords);
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
    if (message.is_question) {
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
      <div className="chat-messages">
      {flattenedMessages.map((message, idx) => {
        if (message.is_question) {
          const messageColor = colorKeywordDict[message.tag];
          return (
            <SingleQnA
                key={message.id}
                index={idx}
                message={message}
                user={user}
                tag={message.tag}
                is_question={message.is_question}
                parent_id={message.parent_id}
                onClick={() => handleQuestionClick(message.id)}
                color={messageColor}
              />
            );
          } else if (selectedQuestionIds.includes(message.parent_id)) {
            const messageColor = colorKeywordDict[message.tag];
            return (
              <SingleQnA
                key={message.id}
                index={idx}
                message={message}
                user={user}
                tag={message.tag}
                is_question={message.is_question}
                parent_id={message.parent_id}
                color={messageColor}
              />
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
