import React from "react";
import Switch from "react-switch";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between; // Keep this to manage space between elements
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #F5F6F7;
  z-index: 1000; // Ensure it's on top

  & span {
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  & .switch {
    display: flex;
    flex-direction: column; // Stack switches vertically
    align-items: flex-end; // Align switches to the right
    position: absolute;
    right: 10px; // Place it on the far right
    top: 5px; // Adjust top for vertical centering
  }

  & .switch label {
    display: flex;
    align-items: center; // Add this to vertically center text and switch
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 5px;
  }
  
  & .switch label:last-child {
    margin-bottom: 0;
  }
  
`;

const Header = ({ roomName, onBack, selectedKeyword, showQnA, setShowQnA, showUnanswered, setShowUnanswered }) => {
  return (
    <HeaderWrapper>
      <span>{roomName}</span>
      {
      <div className="switch">
        {!selectedKeyword && (
          <label>
            Show Q&A:
            <Switch
              onChange={setShowQnA}
              checked={showQnA}
              handleDiameter={20}
              height={14} 
              width={28}
              offColor="#888"
              onColor="#0e0"
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
          </label>
        )}
        <label>
          Show Unanswered Q:
          <Switch
            onChange={setShowUnanswered}
            checked={showUnanswered}
            handleDiameter={20}
            height={14} 
            width={28}
            offColor="#888"
            onColor="#0e0"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          />
        </label>
      </div>
      }
    </HeaderWrapper>
  );
};

export default Header;
