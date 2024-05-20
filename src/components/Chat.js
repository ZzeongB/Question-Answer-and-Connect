import React, { useState, useEffect } from "react";
import csvjson from "../csvjson.json";
import { SingleChat } from "./ChatBlock";
import styled from "styled-components";

const Wrapper = styled.main`
  position: relative;
  top: 50px;
  bottom: 65px;
  left: 0px;
  right: 0px;
  overflow: auto;
  width: 100%;
  background-color: #ffffff;
`;

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages from JSON file
    console.log("Fetching messages");
    setMessages(csvjson);
    console.log("Done fetching messages");
  }, []);
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    // Handle form submission, TODO
    console.log("Form submitted");
  };

  return (
    <Wrapper>
      <div className="chat-messages">
        {messages.slice(-20, -1).map((message, index) => {
          // Display only the last 20 messages
          return <SingleChat message={message} index={index} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Chat;
