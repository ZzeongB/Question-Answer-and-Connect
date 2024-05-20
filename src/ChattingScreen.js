import "./App.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Chat from "./Chat";

const ChattingScreen = () => {
  return (
    <div>
      <p className="testtext">{"Label"}</p>
      <p className="testtext">{"DisplayName"}</p>
      <Chat user={"user"} />
    </div>
  );
};

export default ChattingScreen;
