import "./App.css";
import React, { useState, useEffect } from "react";

import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";
import axios from "axios";


const ChattingScreen = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    axios
      .get("http://localhost:3000/chat")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch chat messages");
      });
  };

  const onChatSubmit = (message) => {
    const date = new Date();
    axios
      .post("http://localhost:3000/chat", {
        User: "me",
        Message: message,
        Date: date.toISOString(),
      })
      .then((res) => {
        console.log("Chat message sent");
        setMessages(prevMessages => [...prevMessages, res.data]); // Update the messages state
  
      })
      .catch((Error) => {
        console.error("Failed to send chat message", Error);
      });
  };
  

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header roomName={"Chatroom"} onBack={() => {}} />
      <Chat
        user={"user"}
        style={{ flex: 1, overflow: "auto" }}
        messages={messages}
      />
      <Footer onChatSumbmit={onChatSubmit} />
    </div>
  );
};

export default ChattingScreen;
