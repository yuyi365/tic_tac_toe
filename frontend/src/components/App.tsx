import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import "./App.css";
import LandingPage from "./LandingPage";

const App = () => {
  const [error, setError] = useState<boolean>(false);
  const [gameId, setGameId] = useState("");
  const [pin, setPin] = useState("");

  const handleError = (error: boolean) => {
    setError(error);
  };

  const handleNewGame = () => {
    console.log("new game");
    // create new game (POST)
    // get back the gameId and pin
    // save gameId and pin to state

    // turn on selection screen state
  };

  const handleResumeGame = () => {
    console.log("resume game");

    // turn on enter pin screen state
  };

  return (
    <div className="App">
      <Header />
      {!error ? (
        <LandingPage
          handleNewGame={handleNewGame}
          handleResumeGame={handleResumeGame}
        />
      ) : (
        <ErrorContainer />
      )}

      {/* {!error ? (
        <BoardContainer handleError={handleError} />
      ) : (
        <ErrorContainer />
      )} */}
    </div>
  );
};

export default App;
