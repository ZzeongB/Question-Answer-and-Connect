import styled from "styled-components";

const KeywordsWrapper = styled.div`
  bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.expanded ? "wrap" : "nowrap")};
  width: 100%;
  // background-color: rgb(0, 0, 0, 0.1);
  cursor: pointer;
  height: auto;
  overflow: ${(props) => (props.expanded ? "visible" : "auto")};
  transition: height 0.3s ease-in-out;
`;
const Keyword = styled.div`
  padding: 10px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor + "B3" : "rgba(0, 128, 0, 0.3)"}; // Add 70% transparency
  color: ${(props) =>
    props.textColor ? props.textColor : "black"}; // Change text color to white
  border-radius: 15px; // Add rounded corners
  margin: 5px; // Add some margin around each keyword
`;


const ExpandableKeywordList = ({ keywords, expanded, setExpanded, onKeywordClick }) => {
  return (
    <KeywordsWrapper
      expanded={expanded}
      onClick={() => {
        console.log("expanding");
        setExpanded(!expanded);
      }}
    >
      {Object.entries(keywords).map(([key, value]) => {
        return (
          <Keyword
            backgroundColor={value.backgroundColor}
            textColor={value.textColor}
            onClick={() => onKeywordClick(key)}
          >
            {key};
          </Keyword>
        );
      })}
    </KeywordsWrapper>
  );
};

export default ExpandableKeywordList;
