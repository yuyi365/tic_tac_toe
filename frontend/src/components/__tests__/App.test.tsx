import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { act } from "react-dom/test-utils";
import { AppState } from "../../appStates";

describe("App component renders", () => {
  it("landing page on default", () => {
    act(() => {
      render(<App appState={AppState.Landing} setAppState={() => null} />);
    });
    const landingDiv = screen.getByTestId("landing-div");
    expect(landingDiv).toBeInTheDocument();
  });

  it("token selection page when app state is set on new game", () => {
    act(() => {
      render(<App appState={AppState.SelectToken} setAppState={() => null} />);
    });
    const tokenDiv = screen.getByTestId("token-div");
    expect(tokenDiv).toBeInTheDocument();
  });

  it("token selection page when app state is set on resume game", () => {
    act(() => {
      render(<App appState={AppState.Resume} setAppState={() => null} />);
    });

    const resumeGameDiv = screen.getByTestId("resume-game-div");
    expect(resumeGameDiv).toBeInTheDocument();
  });

  it("token selection page when app state is set to the board", () => {
    act(() => {
      render(<App appState={AppState.Board} setAppState={() => null} />);
    });

    const boardDiv = screen.getByTestId("progress-container");
    expect(boardDiv).toBeInTheDocument();
  });

  it("token selection page when app state is set on error", () => {
    act(() => {
      render(<App appState={AppState.Error} setAppState={() => null} />);
    });

    const errorDiv = screen.getByTestId("error-container");
    expect(errorDiv).toBeInTheDocument();
  });
});
