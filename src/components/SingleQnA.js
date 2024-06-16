import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 7px 8px;
  border-radius: 4px;
  margin-bottom: 7px;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
  border: 2px solid;

  border-color: ${(props) => props.color || "#ffffff"};
  background-color: ${(props) =>
    props.color ? `${props.color}4D` : "#ffffff4D"};
  box-shadow: ${(props) => props.isHighlighted ? '0 0 10px #ffa500' : 'none'};
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BaseBlock = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 15px;
`;

const RightBlock = styled(BaseBlock)`
  text-align: right;
  & ${ChatWrapper} {
    text-align: left;
    border-radius: 10px;
  }
`;

const LeftBlock = styled(BaseBlock)`
  text-align: left;
  & ${ChatWrapper} {
    text-align: left;
    border-radius: 10px;
  }
`;

const NameBlock = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const TagBlock = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: #888;
`;

const SingleQnA = ({
  index,
  message,
  user,
  tag,
  is_question,
  onClick,
  color,
  number,
  clickedMessage,
  messageId,

}) => {
  const isLoading = message.isLoading;
  const MessageBlock = isLoading || !is_question ? RightBlock : LeftBlock; // Use RightBlock if isLoading
  const backgroundColor = is_question ? color : "#E0E0E0";
  const [isHighlighted, setIsHighlighted] = useState(clickedMessage === messageId);

  useEffect(() => {

    if (isHighlighted) {
      // erase the highlight after 1 second
      setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
    }
  }
  , [isHighlighted]);
  

  return (
    <MessageBlock
      key={index}
      onClick={is_question ? onClick : undefined}
      style={{ cursor: is_question ? "pointer" : "default" }}
    >
       <NameBlock>{message.User}</NameBlock>
      <ChatWrapper color={backgroundColor} isHighlighted={isHighlighted}>
        {message.Message}
        {number ? tag && <TagBlock>{number}개의 답변</TagBlock> : <></>}
      </ChatWrapper>
    </MessageBlock>
  );
};

export default SingleQnA;
