import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { AppState } from "../../utils";

describe("When the board container is still loading", () => {
  it("it renders the loading component", () => {
    render(
      <BoardContainer
        handleAppState={(appState: AppState) => null}
        gameId={0}
      />
    );
    const progressBar = screen.getByTestId("progress-container");
    expect(progressBar).toBeInTheDocument;
  });
});
