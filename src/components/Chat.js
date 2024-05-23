import React, { useState, useEffect } from "react";
import example from "../data/MathDNN.json";
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
    // Fetch messages from the server, TODO
    setMessages(example);
  }, []);

  useEffect(() => {
    console.log("Messages: ", messages);
  }, [messages]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("Form submitted");
  };

  return (
    <Wrapper>
      <div className="chat-messages">
        {messages && // Display messages
          Object.keys(messages)
            .slice(-20) // Display only the last 20 messages
            .map((key) => { // key is the index of the message
              return <SingleChat index={key} message={messages[key]} />;
            })}
      </div>
    </Wrapper>
  );
};

export default Chat;
