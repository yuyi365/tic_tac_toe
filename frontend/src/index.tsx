import ReactDOM from "react-dom";
import { AppState } from "./appStates";
import App from "./components/App";

ReactDOM.render(
  <App appState={AppState.Landing} />,
  document.getElementById("root")
);
