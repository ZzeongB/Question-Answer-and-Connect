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
  const [showQnA, setShowQnA] = useState(false);

  const [showUnanswered, setShowUnanswered] = useState(false);
  
  const [hideNullTags, setHideNullTags] = useState(false); // New state for toggling visibility

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

  
  useEffect(() => {
    // Function to fetch questions based on the current filter or state
    const fetchQuestionsBasedOnFilter = () => {
      axios
        .get("http://localhost:3000/chat")
        .then((response) => {
          // Assume response.data is an array of all messages
          let filteredQuestions = response.data.filter((msg) => {
            const matchesKeyword = selectedKeyword ? msg.tag === selectedKeyword : true;
            const isQnA = showQnA ? (msg.is_question || msg.parent_id) : true;
            const isUnanswered = showUnanswered ? (!msg.parent_id && msg.is_question) : true;
      
          
            return msg.is_question && matchesKeyword && isQnA && isUnanswered&& msg.parent_id==null;
          });
  
          // Assuming you want to limit the number of questions displayed
          filteredQuestions = filteredQuestions.slice(-6); // Get the last 6 questions based on current filters
          setrecentQ(filteredQuestions);
        })
        .catch((error) => {
          console.error("Failed to fetch filtered question messages:", error);
        });
    };
  
    // Call the function when any of the dependencies change
    fetchQuestionsBasedOnFilter();
  }, [selectedKeyword, showQnA, showUnanswered]); // Dependencies array includes states that determine filters
  

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
      const Questions = recentQ.map((q) => q.Message);
      const maxId = messages.reduce((max, msg) => Math.max(max, parseInt(msg.id, 10)), 0) + 1;
  
      const tempMessage = {
        id: maxId.toString(),
        User: "me",
        Message: message,
        Date: new Date().toISOString(),
        is_question: true,
        parent_id: null,
        tag: null,
        isLoading: true,
        opacity: 1,  // Default opacity
      };
  
      console.log(selectedKeyword);
      let initialPostResponse = await axios.post("http://localhost:3000/chat", tempMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        initialPostResponse.data,
      ]);
  
      // Start fading out the message
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === initialPostResponse.data.id ? { ...msg, opacity: 0 } : msg
        )
      );
  
      const formattedRecentQ = recentQ.map(q => `${q.id}. ${q.Message}`).join("\n");
      console.log("Formatted Recent Questions", formattedRecentQ);
  
      const apiResponse = await handleRequest(message, keywordNames, formattedRecentQ);
      console.log("API output", apiResponse, keywordNames);
  
      let isQuestion = false;
      let tag = null;
      let parentId = null;
  
      if (apiResponse.startsWith("NA")) {
        // Handle NA case
      } else if (apiResponse.startsWith("Q, ")) {
        const responseDetails = apiResponse.split("Q, ")[1];
        isQuestion = responseDetails !== "NA";
        tag = responseDetails;
      } else if (apiResponse.startsWith("A, ")) {
        const parentIdFromAPI = apiResponse.split("A, ")[1];
        const parentMessage = recentQ.find((m) => m.id === parentIdFromAPI);
        if (parentMessage) {
          parentId = parentMessage.parent_id ? parentMessage.parent_id : parentIdFromAPI;
          tag = parentMessage.tag;
        }
      }
  
      const fullUpdateData = {
        User: tempMessage.User,
        Message: tempMessage.Message,
        Date: tempMessage.Date,
        isLoading: false,
        is_question: isQuestion,
        parent_id: parentId,
        tag: tag,
        opacity: 1  // Reset opacity for updated message
      };
  
      const updateResponse = await axios.put(`http://localhost:3000/chat/${initialPostResponse.data.id}`, fullUpdateData);
  
      // Update local state with the new message details
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === initialPostResponse.data.id ? { ...msg, ...updateResponse.data } : msg
        )
      );
  
      setApiOutput(apiResponse);
  
    } catch (error) {
      console.error("Error in onChatSubmit:", error);
    }
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

  const onMessageClick = (messageId, keyword) => {
    
    setClickedMessage(messageId);
    setSelectedKeyword(keyword); // Select the clicked keyword
  };
  // Filter messages based on selected keyword
  let filteredMessages = selectedKeyword
    ? messages.filter(
        (message) => {
          return message.tag && message.tag === selectedKeyword;
        } // match data type
      )
    : messages;

    // Updated filtering logic for messages
    filteredMessages = messages.filter(message => {
      const isTempMessage = message.isLoading; // Check if the message is loading
      const matchesKeyword = selectedKeyword ? message.tag === selectedKeyword : true;
      const isQnA = showQnA ? (message.is_question || message.parent_id) : true;
      return (matchesKeyword && isQnA) || isTempMessage; // Include temp messages in any case
    });

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
      <Header
        roomName="Chatroom"
        onBack={() => {}}
        selectedKeyword={selectedKeyword}
        showQnA={showQnA}
        setShowQnA={setShowQnA}
        showUnanswered={showUnanswered}
        setShowUnanswered={setShowUnanswered}
      />{" "}
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
            showUnanswered={showUnanswered}
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
