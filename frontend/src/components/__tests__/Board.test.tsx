import { render, screen } from "@testing-library/react";
import Board from "../Board";

const loadEmptyBoard = () => {
  render(
    <Board
      board={["", "", "", "", "", "", "", "", ""]}
      setBoard={(board) => board}
      gameWinner={""}
      turn={"🦄"}
      setTurn={(turn) => turn}
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
