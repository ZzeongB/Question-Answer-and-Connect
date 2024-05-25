import "./App.css";
import React, { useState, useEffect } from "react";

// Importing necessary components and axios for HTTP requests
import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";
import ExpandableKeywordList from "./components/ExpandableKeywordList";
import axios from "axios";
import QnA from "./components/QnA";
const ChattingScreen = () => {
  // State to hold chat messages and keywords
  const [messages, setMessages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  
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

  const fetchKeywords = () => {
    axios
      .get("http://localhost:3000/keyword")
      .then((response) => {
        // Update state with fetched keywords
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
      .post("http://localhost:3000/chat", {
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

  // Handle keyword click
  const onKeywordClick = (keyword) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null); // Deselect if the same keyword is clicked
    } else {
      setSelectedKeyword(keyword); // Select the clicked keyword
    }
  };

  // Filter messages based on selected keyword
  const filteredMessages = selectedKeyword
    ? messages.filter((message) =>
        message.tag && (message.tag === selectedKeyword)
      )
    : messages;

  // Render the chat screen
  console.log(selectedKeyword);
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
      {selectedKeyword ? 
      <QnA
        user={"me"}
        style={{ flex: 1, overflow: "auto" }}
        messages={filteredMessages}
      />:
      <Chat
        user={"me"}
        style={{ flex: 1, overflow: "auto" }}
        messages={filteredMessages}
      />
}
      <div style={{ position: "fixed", bottom: "0px", width: "100%", backgroundColor: "transparent" }}>
        <ExpandableKeywordList
          keywords={keywords}
          expanded={expanded}
          setExpanded={setExpanded}
          onKeywordClick={onKeywordClick} // Pass click handler to keyword list
        />
        <Footer onChatSumbmit={onChatSubmit} />
      </div>
    </div>
  );
};

export default ChattingScreen;
