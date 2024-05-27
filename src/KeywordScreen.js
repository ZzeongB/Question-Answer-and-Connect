import React from "react";
import { useParams } from "react-router-dom";

const KeywordScreen = () => {
  const { keyword } = useParams();

  return (
    <div>
      <h1>Keyword: {keyword}</h1>
      {/* Add content specific to the keyword */}
    </div>
  );
};

export default KeywordScreen;
