import styled from "styled-components";

const KeywordsWrapper = styled.div`
  bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.$expanded ? "wrap" : "nowrap")};
  width: calc(100% - 40px);
  background-color: "transparent";
  cursor: pointer;
  height: auto;
  overflow: ${(props) => (props.$expanded ? "visible" : "auto")};
  transition: height 0.3s ease-in-out;
  scrollbar-width: none; // Hide scrollbar for Firefox
  paddingright: 50px; // Add padding to the right
`;

const Keyword = styled.div`
  box-sizing: border-box; // Correct property
  padding: 10px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor + "E6"
      : "rgba(255, 255, 255, 0.9)"}; // Add 70% transparency
  color: ${(props) =>
    props.$textColor
      ? props.$textColor
      : "black"}; // Change text color to white
  border-radius: 15px; // Add rounded corners
  margin: 5px; // Add some margin around each keyword
  border: 2px solid transparent; // Add border to each keyword
`;

const ExpandableKeywordList = ({
  keywords,
  expanded,
  setExpanded,
  onKeywordClick,
  selectedKeyword,
}) => {
  return (
    <div
      style={{
        // 두 개 component를 감싸는 div의 style, 두 개 component가 row로, 겹치지 않게 나열되게
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        padding: "0px",
        backgroundColor: "rgb(0, 0, 0, 0.1)",
      }}
    >
      <KeywordsWrapper
        $expanded={expanded}
        onClick={() => {
          //console.log("expanding");
          setExpanded(!expanded);
        }}
      >
        {Object.entries(keywords).map(([key, value]) => {
          return (
            <Keyword
              key={key}
              $backgroundColor={value.backgroundColor}
              $textColor={value.textColor}
              onClick={(event) => {
                event.stopPropagation(); // Add this line
                onKeywordClick(key);
              }}
              style={{
                border:
                  key === selectedKeyword
                    ? "2px solid black"
                    : "2px solid transparent",
              }} // add border inside the keyword
            >
              # {key}
            </Keyword>
          );
        })}
      </KeywordsWrapper>
      <div
        style={{
          position: "absolute",
          right: "0px",
          bottom: "90px",
          width: "30px",
          height: "30px",
        }}
        onClick={() => setExpanded(!expanded)} // Toggles the expanded state
      >
        <img
          src={expanded ? "download.png" : "upload.png"}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "transparent",
          }}
          alt={expanded ? "Collapse" : "Expand"} // Descriptive alternative text
          />
      </div>
    </div>
  );
};

export default ExpandableKeywordList;
