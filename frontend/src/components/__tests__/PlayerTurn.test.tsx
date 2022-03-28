import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../Square";
import Board from "../Board";
import BoardContainer from "../BoardContainer";

describe("When there is a winning combination, the specific square in the combination", () => {
  it("Renders with a classname of highlighted; square-won", () => {
    render(<BoardContainer />);
    render(
      <Board
        board={["", "", "", "", "", "", "", "", ""]}
        setBoard={(board: any) => board}
        gameWinner={undefined}
        turn={"🦄"}
        setTurn={(turn: any) => turn}
      />
    );
    render(
      <Square
        board={["", "", "", "", "", "", "", "", ""]}
        setBoard={(board) => board}
        gameWinner={undefined}
        turn={"🦄"}
        isInWinningCombo={false}
        setTurn={(turn: any) => turn}
        index={3}
      />
    );

    const square = screen.getByRole("cell");
    fireEvent.click(square);
    screen.debug();
    expect("🍄").toBeInTheDocument();
  });
});
