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
  border: 2px solid;
  border-color: ${(props) => props.color || "#ffffff"};
  background-color: ${(props) =>
    props.color ? `${props.color}4D` : "#ffffff4D"};
`;

const BaseBlock = styled.div`
  margin-top: 10px;
  margin-left: 13px;
  margin-right: 13px;
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
  color: rgb(0, 0, 0, 0.5);
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  height: 18px;
  font-size: 12px;
  background-color: transparent;
  color: ${(props) => props.color || "#000"};
  border-radius: 12px;
  margin-bottom: 3px;
  // border: 1px solid ${(props) => props.color || "#000"};
  font-weight: bold;
`;

export const SingleChat = ({
  index,
  message,
  user,
  tag,
  is_question,
  parent_id,
  color,
}) => {
  const backgroundColor = color ? color : user === "me" ? "#E0E0E0" : "#ffffff";
  if (user === message.User) {
    return (
      <RightBlock key={index}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent:"flex-end" }}>
        <NameBlock>{message.User}</NameBlock>
        {message.tag ? (
          <Chip color={backgroundColor}># {message.tag}</Chip>
        ) : (
          <></>
        )}
      </div>
      <ChatWrapper color={backgroundColor}>{message.Message}</ChatWrapper>
      </RightBlock>
    );
  }
  return (
    <LeftBlock key={index}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NameBlock>{message.User}</NameBlock>
        {message.tag ? (
          <Chip color={backgroundColor}># {message.tag}</Chip>
        ) : (
          <></>
        )}
      </div>
      <ChatWrapper color={backgroundColor}>{message.Message}</ChatWrapper>
    </LeftBlock>
  );
};
