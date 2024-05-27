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
  color: rgb(0, 0, 0, 0.5); 
`;

export const SingleChat = ({ index, message, user }) => {
  // messages : [{User: "user", Message: "message", Date: "date"}]
  if (user == message.User) {
    return (
      <RightBlock key={index}>
        <NameBlock>{message.User}</NameBlock>
        <ChatWrapper>
          {message.Message}
        </ChatWrapper>
      </RightBlock>
    );
  }
  return (
    <LeftBlock key={index}>
      <NameBlock>{message.User}</NameBlock>
      <ChatWrapper>
        {message.Message}
      </ChatWrapper>
    </LeftBlock>
  );
};
