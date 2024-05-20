import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import csvjson from "./csvjson.json";
import { SingleChat } from "./components/ChatBlock";

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
    <div className="chat-container">
      <div className="chat-messages">
        {messages.slice(-20, -1).map((message, index) => { // Display only the last 20 messages
          return    <SingleChat message={message} index={index}/>;
        })}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
