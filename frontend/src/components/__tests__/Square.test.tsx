import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Square from "../Square";

const squareProps = {
  index: 1,
  board: ["-", "-", "-"],
  setBoard: jest.fn(),
  winner: null,
};

const loadSubject = () => {
  render(
    <table>
      <tbody>
        <tr>
          <Square {...squareProps} />
        </tr>
      </tbody>
    </table>
  );
};

describe("Square component", () => {
  fit("is clickable and calls the move function", () => {
    const handleOnClick = jest.fn();
    const makeMove = jest.fn();
    loadSubject();
    // screen.debug();
    // const cell = screen.getAllByRole("cell");
    // console.log("CELL", cell);
    userEvent.click(screen.getByRole("cell"));
    // fireEvent.click(cell);
    expect(makeMove).toHaveBeenCalled();
  });
});
