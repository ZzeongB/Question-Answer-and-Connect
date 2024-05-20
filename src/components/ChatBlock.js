import React from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 7px 8px;
  border-radius: 4px;
  margin-bottom: 7px;
  box-shadow: 0px 1px 2px 0px #8fabc7;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const RightBlock = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  & ${ChatWrapper} {
    background-color: #ffec42;
    text-align: left;
  }
`;

const LeftBlock = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  & ${ChatWrapper} {
    background-color: #ffec42;
    text-align: left;
  }
`;

const NameBlock = styled.div`
  margin-bottom: 5px;
`;

export const SingleChat = ({ index, message }) => {
  // messages : [{User: "user", Message: "message", Date: "date"}]
  return (
    <LeftBlock key={index}>
      <NameBlock>{message.User}</NameBlock>
      <ChatWrapper>
        {message.Message}
      </ChatWrapper>
    </LeftBlock>
  );
};
