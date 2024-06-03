import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #F5F6F7;

  & span {
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  & button {
    font-size: 20px;
    padding: 10px;
    border: none;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      color: #dcdcdc;
    }
  }
`;

const Header = ({ roomName, onBack }) => {
  return (
    <HeaderWrapper>
      {/* <button onClick={onBack}>{"<"}</button> */}
      <span>{roomName}</span>
    </HeaderWrapper>
  );
};

export default Header;
