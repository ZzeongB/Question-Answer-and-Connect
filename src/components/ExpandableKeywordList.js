import styled from "styled-components";

const KeywordsWrapper = styled.div`
  bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap:${(props) => (props.expanded ? "wrap" : "nowrap")};
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  height: ${(props) => (props.expanded ? "auto" : "50px")};
  overflow: ${(props) => (props.expanded ? "visible" : "auto")};
  transition: height 0.3s ease-in-out;
`;
const Keyword = styled.div`
  padding: 10px;
  white-space: nowrap;
  background-color: #4caf50; // Add color
  color: white; // Change text color to white
  border-radius: 15px; // Add rounded corners
  margin: 5px; // Add some margin around each keyword
`;

const ExpandableKeywordList = ({ keywords, expanded, setExpanded }) => {
  return (
    <KeywordsWrapper
      expanded={expanded}
      onClick={() => {
        console.log("expanding");
        setExpanded(!expanded);
      }}
    >
      {keywords.map((keyword, index) => {
        return <Keyword>{keyword}</Keyword>;
      })}
    </KeywordsWrapper>
  );
};

export default ExpandableKeywordList;
