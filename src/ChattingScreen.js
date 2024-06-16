import "./App.css";
import React, { useState, useEffect, useRef } from "react";

// Importing necessary components and axios for HTTP requests
import Chat from "./components/Chat";
import Header from "./components/ChatroomHeader";
import Footer from "./components/ChatroomFooter";
import ExpandableKeywordList from "./components/ExpandableKeywordList";
import axios from "axios";
import QnA from "./components/QnA";
import handleRequest from "./api/generate";

const ChattingScreen = () => {
  // State to hold chat messages and keywords
  const [messages, setMessages] = useState([]);
  const [recentQ, setrecentQ] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [clickedMessage, setClickedMessage] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [apiOutput, setApiOutput] = useState();
  const messagesEndRef = useRef(null);
  const messageRefs = useRef({});
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.lastElementChild?.scrollIntoView();
    }
  };
  
  useEffect(scrollToBottom, []); // add your message list state variable in the dependency array

  useEffect(() => {
     scrollToBottom();
   }, [messages, selectedKeyword]);

  useEffect(() => {
    const newRefs = {};
    messages.forEach((msg) => {
      newRefs[msg.id] = React.createRef();
    });
    messageRefs.current = newRefs;
  }, [messages]);

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

  const fetchRecentQuestions = () => {
    axios
      .get("http://localhost:3000/chat")
      .then((response) => {
        // Filter messages for is_question true and slice the last 6
        const questions = response.data
          .filter((msg) => msg.is_question)
          .slice(-6);
        setrecentQ(questions);
      })
      .catch((error) => {
        console.error("Failed to fetch question messages:", error);
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
  const onChatSubmit = async (message) => {
    try {
      const keywordNames = Object.keys(keywords);
      const Questions = recentQ.map(
        (messageObject) => `${messageObject.id}. ${messageObject.Message}`
      );

      // Determine the next message ID
      const maxId =
        messages.reduce((max, msg) => Math.max(max, parseInt(msg.id, 10)), 0) +
        1;

      // Initially post the message with temporary values
      const tempMessage = {
        id: maxId.toString(), // Use the calculated ID
        User: "me",
        Message: message,
        Date: new Date().toISOString(),
        is_question: false,
        parent_id: null,
        tag: null,
        isLoading: true,
      };

      let initialPostResponse = await axios.post(
        "http://localhost:3000/chat",
        tempMessage
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        initialPostResponse.data,
      ]);

      // Call API to get response details
      const apiResponse = await handleRequest(message, keywordNames, Questions);
      console.log("API output", apiResponse, keywordNames);

      let isQuestion = false;
      let tag = null;
      let parentId = null;

      if (apiResponse.startsWith("Q, ")) {
        isQuestion = true;
        tag = apiResponse.split("Q, ")[1];
      } else if (apiResponse.startsWith("A, ")) {
        const parentIdFromAPI = apiResponse.split("A, ")[1];
        const parentMessage = recentQ.find((m) => m.id === parentIdFromAPI);

        if (parentMessage) {
          parentId = parentMessage.parent_id
            ? parentMessage.parent_id
            : parentIdFromAPI;
          tag = parentMessage.tag;
        }
      }

      // Update the message on the server with new details including all fields
      const fullUpdateData = {
        User: tempMessage.User, // Re-include original data for safety
        Message: tempMessage.Message, // Re-include original data for safety
        Date: tempMessage.Date, // Re-include original data for safety
        isLoading: false,
        is_question: isQuestion,
        parent_id: parentId,
        tag: tag,
      };

      const updateResponse = await axios.put(
        `http://localhost:3000/chat/${initialPostResponse.data.id}`,
        fullUpdateData
      );

      // Update local state with the new message details
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === initialPostResponse.data.id
            ? { ...msg, ...updateResponse.data }
            : msg
        )
      );

      if (isQuestion && !keywordNames.includes(tag)) {
        const newKeyword = {
          backgroundColor: getNextTab10Color(),
          textColor: "#000000",
        };

        // Update the keywords object in your local state or context
        keywords[tag] = newKeyword;

        // Prepare the object in the format expected by the server
        const keywordData = {
          [tag]: newKeyword,
        };

        // Post the new keyword to the server
        await axios
          .post("http://localhost:3000/keyword", keywordData)
          .then((response) => {
            console.log("Keyword added:", response.data);
          })
          .catch((error) => {
            console.error("Error adding keyword:", error);
          });
      }

      setApiOutput(apiResponse);
      fetchRecentQuestions();
    } catch (error) {
      console.error("Error in onChatSubmit:", error);
    }
  };

  let lastColorIndex = 0;

  function getNextTab10Color() {
    const colors = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
    ];
    const currentColorIndex = lastColorIndex % colors.length;
    lastColorIndex += 1; // Increment the index for next use
    return colors[currentColorIndex];
  }

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
    fetchKeywords();
    fetchRecentQuestions();
  }, []);

  // Handle keyword click
  const onKeywordClick = (keyword) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null); // Deselect if the same keyword is clicked
    } else {
      setSelectedKeyword(keyword); // Select the clicked keyword
    }
  };

  const onMessageClick = (messageId, keyword) => {
    console.log("Message clicked:", messageId);
    setClickedMessage(messageId);
    setSelectedKeyword(keyword); // Select the clicked keyword
  };


  // Filter messages based on selected keyword
  const filteredMessages = selectedKeyword
    ? messages.filter(
        (message) => {
          return message.tag && message.tag === selectedKeyword;
        } // match data type
      )
    : messages;

  // Render the chat screen
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5F6F7",
        flex: 1,
      }}
    >
      <Header roomName={"Chatroom"} onBack={() => {}} />
      <div style={{ overflow: "auto" }}>
        {selectedKeyword ? (
          <QnA
            user={"me"}
            style={{ flex: 1, overflow: "auto" }}
            messages={filteredMessages}
            keywords={keywords}
            messagesEndRef={messagesEndRef}
            messageRefs={messageRefs}
            clickedMessage={clickedMessage}
          />
        ) : (
          <Chat
            user={"me"}
            style={{ overflow: "auto" }}
            messages={filteredMessages}
            keywords={keywords}
            messagesEndRef={messagesEndRef}
            handleClick={onMessageClick}
            messageRefs={messageRefs}
            clickedMessage={clickedMessage}
          />
        )}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
          backgroundColor: "transparent",
          padding: "0px",
        }}
      >
        <ExpandableKeywordList
          keywords={keywords}
          expanded={expanded}
          setExpanded={setExpanded}
          onKeywordClick={onKeywordClick} // Pass click handler to keyword list
          selectedKeyword={selectedKeyword}
        />
        <Footer onChatSumbmit={onChatSubmit} />
      </div>
    </div>
  );
};

export default ChattingScreen;
