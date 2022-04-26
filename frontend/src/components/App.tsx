import { useState } from "react";
import BoardContainer from "./BoardContainer";
import TokenSelection from "./TokenSelection";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import "./App.css";
import LandingPage from "./LandingPage";

const App = () => {
  const [error, setError] = useState<boolean>(false);
  const [landingPage, setLandingPage] = useState(true);
  const [tokenPage, setTokenPage] = useState(false);
  const [pinPage, setPinPage] = useState(false);
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
    setTokenPage(!tokenPage);
    // turn off landing screen state
    setLandingPage(!landingPage);

    // ==> TOKEN SELECTION PAGE
  };

  const handleResumeGame = () => {
    console.log("resume game");

    // turn on enter pin screen state
    setPinPage(!pinPage);
    // turn off landing screen state
    setLandingPage(!landingPage);
    // ==> PIN PAGE
  };

  return (
    <div className="App">
      <Header />
      {!error && landingPage ? (
        <LandingPage
          handleNewGame={handleNewGame}
          handleResumeGame={handleResumeGame}
        />
      ) : !error && tokenPage ? (
        <TokenSelection />
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
