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
              index={0}
              token={"🍄"}
              gameWinner={"🍄"}
              handleMove={(move: any) => move}
              className={"square-won"}
            />
          </tr>
        </tbody>
      </table>
    );
    const square = screen.getAllByRole("cell");
    expect(square).toHaveLength(1);
  });
});
