import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "../Board";

const loadEmptyBoard = () => {
  render(
    <Board
      board={["", "", "", "", "", "", "", "", ""]}
      gameWinner={""}
      handleMove={jest.fn(() => null)}
      setError={(error: any) => error}
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
    render(
      <Board
        board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
        winningCombo={[3, 4, 5]}
        gameWinner={"🍄"}
        handleMove={jest.fn(() => null)}
        setError={(error: any) => error}
      />
    );
    const squares = screen.getAllByRole("cell");
    expect(squares[3]).toHaveClass("square-won");
    expect(squares[4]).toHaveClass("square-won");
    expect(squares[5]).toHaveClass("square-won");
  });
});
