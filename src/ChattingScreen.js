import "./App.css";
import React, { useState, useEffect } from "react";

// Importing necessary components and axios for HTTP requests
import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";
import axios from "axios";

const ChattingScreen = () => {
  // State to hold chat messages
  const [messages, setMessages] = useState([]);

  // Function to fetch chat messages from server
  const fetchMessages = () => {
    axios
      .get("http://localhost:3000/chat")
      .then((response) => {
        // Update state with fetched messages
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch chat messages");
      });
  };

  // Function to handle chat submission
  const onChatSubmit = (message) => {
    const date = new Date();
    axios
      .post("http://localhost:3000/chat", {
        User: "me",
        Message: message,
        Date: date.toISOString(),
      })
      .then((res) => {
        console.log("Chat message sent", res);
        // Update the messages state with the new message
        setMessages(prevMessages => [...prevMessages, res.data]);
      })
      .catch((Error) => {
        console.error("Failed to send chat message", Error);
      });
  };

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Render the chat screen
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent:"space-between" }}>
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