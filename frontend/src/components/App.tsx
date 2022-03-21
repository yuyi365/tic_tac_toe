import BoardContainer from "./BoardContainer";
import Header from "./Header";
import "./App.css";
// import { useState } from "react";

const App = () => {
  // const [playerOneInfo, setPlayerOneInfo] = useState({
  //   id: 1,
  //   token: "",
  // });

  // const [playerTwoInfo, setPlayerTwoInfo] = useState({
  //   id: 2,
  //   token: "",
  // });

  return (
    <div className="App">
      <Header />
      <BoardContainer />
    </div>
  );
};

export default App;
