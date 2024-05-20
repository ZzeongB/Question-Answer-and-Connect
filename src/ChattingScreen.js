import "./App.css";
import React from "react";

import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";

const ChattingScreen = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',}}>
      <Header roomName={"Chatroom"} onBack={() => {}} />
        <Chat user={"user"} style={{ flex: 1, overflow: 'auto' }}/>
        <Footer
          onChatSumbmit={() => {
            console.log("Chat submitted");
          }}
        />
    </div>
  );
};

export default ChattingScreen;
