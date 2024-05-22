import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;

  & span {
    font-weight: bold;
    font-size: 20px;
  }

  & button {
    font-size: 20px;
    padding: 10px;
    background-color: #ffffff;
    border: none;
    cursor: pointer;

    &:hover {
      color: #dcdcdc;
    }
  }
`;

const Header = ({ roomName, onBack }) => {
  return (
    <HeaderWrapper>
      <button onClick={onBack}>Back</button>
      <span>{roomName}</span>
    </HeaderWrapper>
  );
};

export default Header;
