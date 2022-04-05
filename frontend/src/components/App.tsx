import { useState } from "react";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import ErrorContainer from "./ErrorContainer";
import "./App.css";

const App = () => {
  const [error, setError] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      {!error ? <BoardContainer setError={setError} /> : <ErrorContainer />}
    </div>
  );
};

export default App;
