import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";

describe("When the board container is still loading", () => {
  it("it renders the loading component", () => {
    const playerOneToken = "🦄";
    const playerTwoToken = "🍄";
    render(
      <BoardContainer
        setError={(error: any) => error}
        playerOneToken={playerOneToken}
        playerTwoToken={playerTwoToken}
      />
    );
    const progressBar = screen.getByTestId("progress-container");
    expect(progressBar).toBeInTheDocument;
  });
});
