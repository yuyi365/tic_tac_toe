import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "../Board";

const loadEmptyBoard = () => {
  render(
    <Board
      board={["", "", "", "", "", "", "", "", ""]}
      gameWinner={""}
      handleMove={jest.fn((index: number) => null)}
      handleError={(error: boolean) => null}
    />
  );
};

describe("Board Component", () => {
  it("Renders 9 square components", () => {
    loadEmptyBoard();
    const squares = screen.getAllByRole("cell");
    expect(squares).toHaveLength(9);
  });
});

describe("When there is a winning combination, the specific square in the combination", () => {
  it("Renders with a classname of highlighted; square-won", () => {
    const playerTwoToken = "🍄";

    render(
      <Board
        board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
        winningCombo={[3, 4, 5]}
        gameWinner={playerTwoToken}
        handleMove={jest.fn((index: number) => null)}
        handleError={(error: boolean) => null}
      />
    );
    const squares = screen.getAllByRole("cell");
    expect(squares[0]).not.toHaveClass("square-won");
    expect(squares[1]).not.toHaveClass("square-won");
    expect(squares[2]).not.toHaveClass("square-won");
    expect(squares[3]).toHaveClass("square-won");
    expect(squares[4]).toHaveClass("square-won");
    expect(squares[5]).toHaveClass("square-won");
    expect(squares[6]).not.toHaveClass("square-won");
    expect(squares[7]).not.toHaveClass("square-won");
    expect(squares[8]).not.toHaveClass("square-won");
  });
});
