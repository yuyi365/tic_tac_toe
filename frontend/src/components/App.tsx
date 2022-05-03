import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import LandingPage from "./LandingPage";
import TokenSelectionContainer from "./TokenSelectionContainer";
import ResumeGame from "./ResumeGame";
import { AppState } from "../utils";
import "./App.css";

const App = () => {
  const [appState, setAppState] = useState<AppState>(AppState._Landing);
  const [gameId, setGameId] = useState(0);

  const handleAppState = (newAppState: AppState) => {
    setAppState(newAppState);
  };

  const handleUpdateGameIdGetBoard = (inputGameId: number) => {
    setGameId(inputGameId);
    setAppState(AppState._Board);
  };

  const handleUpdateGameIdSelectToken = (newGameId: number) => {
    setGameId(newGameId);
    setAppState(AppState._SelectToken);
  };

  const appStateRender = () => {
    let appStateRender = appState;
    switch (appStateRender) {
      case 0:
        return (
          <LandingPage
            handleAppState={handleAppState}
            handleUpdateGameIdSelectToken={handleUpdateGameIdSelectToken}
          />
        );
      case 1:
        return (
          <TokenSelectionContainer
            handleAppState={handleAppState}
            gameId={gameId}
          />
        );
      case 2:
        return (
          <ResumeGame handleUpdateGameIdGetBoard={handleUpdateGameIdGetBoard} />
        );
      case 3:
        return (
          <BoardContainer handleAppState={handleAppState} gameId={gameId} />
        );
      case 4:
        return <ErrorContainer />;
    }
  };

  return (
    <div className="App">
      <Header />
      {appStateRender()}
    </div>
  );
};

export default App;
