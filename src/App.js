import ChattingScreen from "./ChattingScreen";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ChattingScreen />
    </>
  );
}

export default App;
