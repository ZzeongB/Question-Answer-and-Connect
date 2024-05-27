import "./App.css";
import React, { useState, useEffect } from "react";

// Importing necessary components and axios for HTTP requests
import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";
import ExpandableKeywordList from "./components/ExpandableKeywordList";
import axios from "axios";

const ChattingScreen = () => {
  // State to hold chat messages and keywords
  const [messages, setMessages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // Function to fetch chat messages from server
  const fetchMessages = () => {
    axios
      .get("http://localhost:3001/chat")
      .then((response) => {
        // Update state with fetched messages
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch chat messages");
      });
  };

  const fetchKeywords = () => {
    axios
      .get("http://localhost:3001/keyword")
      .then((response) => {
        // Update state with fetched messages
        setKeywords(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch keywords");
      });
  };

  // Function to handle chat submission
  const onChatSubmit = (message) => {
    const date = new Date();
    axios
      .post("http://localhost:3001/chat", {
        User: "me",
        Message: message,
        Date: date.toISOString(),
      })
      .then((res) => {
        console.log("Chat message sent", res);
        // Update the messages state with the new message
        setMessages((prevMessages) => [...prevMessages, res.data]);
      })
      .catch((Error) => {
        console.error("Failed to send chat message", Error);
      });
  };

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
    fetchKeywords();
  }, []);
  // Render the chat screen
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgb(205, 223, 223)",
      }}
    >
      <Header roomName={"Chatroom"} onBack={() => {}} />
      <Chat
        user={"user"}
        style={{ flex: 1, overflow: "auto" }}
        messages={messages}
      />
      <div style={{position: "fixed", bottom: "0px", width: "100%", backgroundColor:"transparent"}}>
        <ExpandableKeywordList
          keywords={keywords}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Footer onChatSumbmit={onChatSubmit} />
      </div>
    </div>
  );
};

export default ChattingScreen;
