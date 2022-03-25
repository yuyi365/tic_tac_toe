import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../Square";
import Board from "../Board";

describe("Square component", () => {
  it("Renders on the screen", () => {
    render(
      <Square
        board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
        setBoard={(board) => board}
        gameWinner={"🍄"}
        turn={"🦄"}
        isInWinningCombo={true}
        setTurn={(turn: any) => turn}
        index={3}
      />
    );
    const square = screen.getAllByRole("cell");
    expect(square).toHaveLength(1);
  });
});

describe("When there is a winning combination, the specific square in the combination", () => {
  it("Renders with a classname of highlighted; square-won", () => {
    render(
      <Board
        board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
        setBoard={(board: any) => board}
        gameWinner={"🍄"}
        turn={"🦄"}
        setTurn={(turn: any) => turn}
      />
    );
    render(
      <Square
        board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
        setBoard={(board) => board}
        gameWinner={"🍄"}
        turn={"🦄"}
        isInWinningCombo={true}
        setTurn={(turn: any) => turn}
        index={3}
      />
    );
    const squares = screen.getAllByRole("cell");
    screen.debug();
    expect(squares[0]).toHaveClass("square-clicked");
  });
});

// describe("When there is a winning combination, the specific square that is not in the winning combination but is clicked", () => {
//   it("Renders with a classname of highlighted; square-clicked", () => {
//     loadSquareClickedBoard();
//     screen.debug();
//     const square = screen.getAllByRole("cell");
//     expect(square[0]).toHaveClass("square-clicked");
//   });
// });
