import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import LandingPage from "./LandingPage";
import TokenSelectionContainer from "./TokenSelectionContainer";
import ResumeGame from "./ResumeGame";
import "./App.css";
import calculateWinner from "../gamelogic";
import {
  MakeNewGameService,
  GetBoardService,
  MakeSettingsService,
  Player,
} from "../client";

const App = () => {
  const [error, setError] = useState<boolean>(false);
  const [landingPage, setLandingPage] = useState(true);
  const [tokenPage, setTokenPage] = useState(false);
  const [boardPage, setBoardPage] = useState(false);
  const [pinPage, setPinPage] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [playerOneToken, setPlayerOneToken] = useState("");
  const [playerTwoToken, setPlayerTwoToken] = useState("");
  const [board, setBoard] = useState<Array<string>>([]);
  const [turn, setTurn] = useState<Player>(Player._1);
  const [turnToken, setTurnToken] = useState("");
  const winner = calculateWinner(board);

  const handleError = (error: boolean) => {
    setError(error);
  };

  async function handleNewGame() {
    await MakeNewGameService.makeNewGame()
      .then((data) => {
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
        alert(
          `Your Game ID is ${gameId} use this pin to resume your game later!`
        );
        GetBoardService.getBoard(gameId)
          .then((boardResponse) => {
            setBoard(boardResponse.slots);
            setTurn(boardResponse.next_turn);
            setTurnToken(boardResponse.next_turn_token);
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
        setTurn(boardResponse.next_turn);
        setTurnToken(boardResponse.next_turn_token);
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
        <ResumeGame gameId={gameId} setGameId={setGameId} findGame={findGame} />
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
          turn={turn}
          setTurn={setTurn}
          turnToken={turnToken}
          setTurnToken={setTurnToken}
        />
      ) : (
        <ErrorContainer />
      )}
    </div>
  );
};

export default App;
