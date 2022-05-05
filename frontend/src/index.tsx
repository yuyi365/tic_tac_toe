import ReactDOM from "react-dom";
import { AppState } from "./appStates";
import App from "./components/App";

const [appState, setAppState] = useState<AppState>(AppState.Landing);
ReactDOM.render(
  <App appState={appState} setAppState={setAppState} />,
  document.getElementById("root")
);
