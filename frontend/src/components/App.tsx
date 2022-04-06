import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import "./App.css";

const App = () => {
  const [error, setError] = useState<boolean>(false);
  const playerOneToken = "🦄";
  const playerTwoToken = "🍄";

  const handleError = (error: boolean) => {
    setError(error);
  };

  return (
    <div className="App">
      <Header />
      {!error ? (
        <BoardContainer
          handleError={handleError}
          playerOneToken={playerOneToken}
          playerTwoToken={playerTwoToken}
        />
      ) : (
        <ErrorContainer />
      )}
    </div>
  );
};

export default App;
