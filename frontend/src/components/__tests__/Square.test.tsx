import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../Square";
import Board from "../Board";

describe("Square component", () => {
  it("Renders on the screen", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Square
              board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
              setBoard={(board) => board}
              gameWinner={"🍄"}
              turn={"🦄"}
              isInWinningCombo={true}
              setTurn={(turn: any) => turn}
              index={3}
            />
          </tr>
        </tbody>
      </table>
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
        winningCombo={[3, 4, 5]}
        setBoard={(board: any) => board}
        gameWinner={"🍄"}
        turn={"🦄"}
        setTurn={(turn: any) => turn}
      />
    );
    const squares = screen.getAllByRole("cell");
    expect(squares[3]).toHaveClass("square-won");
    expect(squares[4]).toHaveClass("square-won");
    expect(squares[5]).toHaveClass("square-won");
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
