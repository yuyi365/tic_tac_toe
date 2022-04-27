import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import LandingPage from "./LandingPage";
import TokenSelectionContainer from "./TokenSelectionContainer";
import ResumePin from "./ResumePin";
import "./App.css";
import calculateWinner from "../gamelogic";
import {
  MakeNewGameService,
  GetBoardService,
  MakeSettingsService,
} from "../client";

const App = () => {
  const [error, setError] = useState<boolean>(false);
  const [landingPage, setLandingPage] = useState(true);
  const [tokenPage, setTokenPage] = useState(false);
  const [boardPage, setBoardPage] = useState(false);
  const [pinPage, setPinPage] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [pin, setPin] = useState("");
  const [playerOneToken, setPlayerOneToken] = useState("");
  const [playerTwoToken, setPlayerTwoToken] = useState("");
  const [board, setBoard] = useState<Array<string>>([]);
  const winner = calculateWinner(board);

  const handleError = (error: boolean) => {
    setError(error);
  };

  async function handleNewGame() {
    await MakeNewGameService.makeNewGame()
      .then((data) => {
        setPin(data.pin);
        setGameId(data.game_id);
      })
      .catch(() => {
        handleError(true);
      });
    setTokenPage(!tokenPage);
    setLandingPage(!landingPage);
  }

  async function handleStartGame() {
    await MakeSettingsService.makeSettings(gameId, {
      player_one_token: playerOneToken,
      player_two_token: playerTwoToken,
    })
      .then(() => {
        GetBoardService.getBoard(gameId)
          .then((boardResponse) => {
            setBoard(boardResponse.slots);
            handleError(false);
            setBoardPage(!boardPage);
          })
          .catch(() => {
            handleError(true);
          });
      })
      .catch(() => {
        handleError(true);
      });
    setTokenPage(!tokenPage);
  }

  const handleResumeGame = () => {
    setPinPage(!pinPage);
    setLandingPage(!landingPage);
  };

  async function findGame() {
    GetBoardService.getBoard(gameId)
      .then((boardResponse) => {
        setBoard(boardResponse.slots);
        setPinPage(!pinPage);
        setBoardPage(!boardPage);
      })
      .catch(() => {
        handleError(true);
      });
  }

  return (
    <div className="App">
      <Header />

      {!error && landingPage ? (
        <LandingPage
          handleNewGame={handleNewGame}
          handleResumeGame={handleResumeGame}
        />
      ) : !error && pinPage ? (
        <ResumePin
          pin={pin}
          setPin={setPin}
          gameId={gameId}
          setGameId={setGameId}
          findGame={findGame}
        />
      ) : !error && tokenPage ? (
        <TokenSelectionContainer
          handleStartGame={handleStartGame}
          setPlayerOneToken={setPlayerOneToken}
          setPlayerTwoToken={setPlayerTwoToken}
          playerOneToken={playerOneToken}
          playerTwoToken={playerTwoToken}
        />
      ) : !error && boardPage ? (
        <BoardContainer
          handleError={handleError}
          board={board}
          winner={winner}
          gameId={gameId}
          setBoard={setBoard}
        />
      ) : (
        <ErrorContainer />
      )}
    </div>
  );
};

export default App;
