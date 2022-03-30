import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../Square";

describe("Square component", () => {
  it("Renders on the screen", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Square
              index={3}
              board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
              setBoard={(board) => board}
              gameWinner={"🍄"}
              turn={"🦄"}
              isInWinningCombo={true}
              handleSwitchToken={(token: any) => token}
            />
          </tr>
        </tbody>
      </table>
    );
    const square = screen.getAllByRole("cell");
    expect(square).toHaveLength(1);
  });
});
