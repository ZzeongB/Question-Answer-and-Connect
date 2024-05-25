import React from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 7px 8px;
  border-radius: 4px;
  margin-bottom: 7px;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
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
    background-color: #ffec42;
    text-align: left;
  }
`;

const LeftBlock = styled(BaseBlock)`
  text-align: left;
  & ${ChatWrapper} {
    background-color: #ffffff;
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

const SingleQnA = ({ index, message, user, tag, is_question, parent_id, onClick }) => {
  const isUserMessage = user === message.User;
  
  const MessageBlock = is_question ? RightBlock : LeftBlock;

  return (
    <MessageBlock key={index} onClick={is_question ? onClick : undefined} style={{ cursor: is_question ? 'pointer' : 'default' }}>
      <NameBlock>{message.User}</NameBlock>
      <ChatWrapper>
        {message.Message}
        {tag && <TagBlock>{tag}</TagBlock>}
      </ChatWrapper>
    </MessageBlock>
  );
};

export default SingleQnA;
