import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultsContainer from "../ResultsContainer";

describe("When winner is generated", () => {
  it("it renders the results component with the winner and Game ID", () => {
    const expectedContent = "Game is over - the winner is 🦄";
    render(<ResultsContainer gameWinner={"🦄"} player={""} gameId={10} />);

    const gameID = screen.getByTestId("game-id");
    const resultsContent = screen.getByTestId("results");

    expect(gameID).toHaveTextContent("10");
    expect(resultsContent).toHaveTextContent(expectedContent);
  });
});

describe("When there is no winner", () => {
  it("it renders the results component with the winner and game ID", () => {
    const expectedContent = "It's your turn, player: 👑";

    render(<ResultsContainer gameWinner={""} player={"👑"} gameId={15} />);

    const gameID = screen.getByTestId("game-id");
    const resultsContent = screen.getByTestId("results");

    expect(gameID).toHaveTextContent("15");
    expect(resultsContent).toHaveTextContent(expectedContent);
  });
});
