import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../Square";

describe("Square component", () => {
  const playerTwoToken = "🍄";
  it("Renders on the screen", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Square
              index={0}
              token={playerTwoToken}
              gameWinner={playerTwoToken}
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

describe("A click on the square", () => {
  it("calls handleMove", () => {
    const mockHandleMove = jest.fn((index: number) => null);
    render(
      <table>
        <tbody>
          <tr>
            <Square
              index={0}
              token={""}
              gameWinner={""}
              handleMove={mockHandleMove}
              className={"square"}
            />
          </tr>
        </tbody>
      </table>
    );
    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    expect(mockHandleMove).toHaveBeenCalledWith(0);
  });

  it("does not call handleMove if there is a winner", () => {
    const playerOneToken = "🦄";
    const mockHandleMove = jest.fn((index: number) => null);
    render(
      <table>
        <tbody>
          <tr>
            <Square
              index={0}
              token={""}
              gameWinner={playerOneToken}
              handleMove={mockHandleMove}
              className={"square-won"}
            />
          </tr>
        </tbody>
      </table>
    );
    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    expect(mockHandleMove).not.toHaveBeenCalled();
  });
});
