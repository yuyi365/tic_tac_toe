import { useState, useEffect } from "react";
import { GetBoardService } from "../client";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import "./App.css";

const App = () => {
  const [error, setError] = useState(false);
  const [board, setBoard] = useState<Array<string>>([]);

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    GetBoardService.getBoard()
      .then((boardResponse) => {
        setBoard(boardResponse.slots);
        setError(true);
      })
      .catch(() => {
        setError(false);
      });
  }

  return (
    <div className="App">
      <Header />
      {error ? (
        <BoardContainer
          error={error}
          setError={setError}
          board={board}
          setBoard={setBoard}
        />
      ) : (
        <ErrorContainer />
      )}
    </div>
  );
};

export default App;
