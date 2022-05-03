import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import LandingPage from "./LandingPage";
import TokenSelectionContainer from "./TokenSelectionContainer";
import ResumeGame from "./ResumeGame";
import { AppState } from "../appStates";
import "./App.css";

type Props = {
  appState: AppState;
  setAppState: (appState: AppState) => void;
};
const App = (props: Props) => {
  const [gameId, setGameId] = useState(0);

  const handleAppState = (newAppState: AppState) => {
    props.setAppState(newAppState);
  };

  const handleUpdateGameIdGetBoard = (inputGameId: number) => {
    setGameId(inputGameId);
    props.setAppState(AppState.Board);
  };

  const handleUpdateGameIdSelectToken = (newGameId: number) => {
    setGameId(newGameId);
    props.setAppState(AppState.SelectToken);
  };

  const appStateRender = () => {
    switch (props.appState) {
      case AppState.Landing:
        return (
          <LandingPage
            handleAppState={handleAppState}
            handleUpdateGameIdSelectToken={handleUpdateGameIdSelectToken}
          />
        );
      case AppState.SelectToken:
        return (
          <TokenSelectionContainer
            handleAppState={handleAppState}
            gameId={gameId}
          />
        );
      case AppState.Resume:
        return (
          <ResumeGame handleUpdateGameIdGetBoard={handleUpdateGameIdGetBoard} />
        );
      case AppState.Board:
        return (
          <BoardContainer handleAppState={handleAppState} gameId={gameId} />
        );
      case AppState.Error:
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
