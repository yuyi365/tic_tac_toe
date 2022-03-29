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
