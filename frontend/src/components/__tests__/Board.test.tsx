import { render, screen } from "@testing-library/react";
import { CancelablePromise, GetBoardService, Player } from "../../client";
import "@testing-library/jest-dom";
import Board from "../Board";
import { act } from "react-dom/test-utils";

const loadEmptyBoard = () => {
  render(
    <Board
      board={["", "", "", "", "", "", "", "", ""]}
      gameWinner={""}
      handleMove={jest.fn((index: number) => null)}
      handleError={(error: boolean) => null}
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

describe("When the component loads", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gets a board if the request is valid", async () => {
    jest.spyOn(GetBoardService, "getBoard").mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
          next_turn: Player._1,
          next_turn_token: "🍄",
        });
      });
    });

    act(() => {
      render(
        <Board
          board={["🦄", "🍄", "", "", "", "", "", "", "🦄"]}
          handleError={(error: boolean) => null}
          handleMove={jest.fn((index: number) => null)}
        />
      );
    });
  });

  describe("When there is a winning combination, the specific square in the combination", () => {
    it("Renders with a classname of square-won", () => {
      const playerTwoToken = "🍄";

      render(
        <Board
          board={["🦄", "🦄", "", "🍄", "🍄", "🍄", "🦄", "", "🦄"]}
          winningCombo={[3, 4, 5]}
          gameWinner={playerTwoToken}
          handleMove={jest.fn((index: number) => null)}
          handleError={(error: boolean) => null}
        />
      );
      const squares = screen.getAllByRole("cell");
      const squareWon = squares.slice(3, 6);
      const squareNotWon = squares.slice(0, 3).concat(squares.slice(6));

      expect(
        squareWon.every((square) => square.className === "square-won")
      ).toBeTruthy();
      expect(
        squareNotWon.every((square) => square.className !== "square-won")
      ).toBeTruthy();
    });
  });

  describe("When there is not a winning combination, but there are clicked squares, the board", () => {
    it("Renders with a combination of classnames square-clicked and square", () => {
      render(
        <Board
          board={["", "", "", "", "", "🍄", "🦄", "", "🦄"]}
          handleMove={jest.fn((index: number) => null)}
          handleError={(error: boolean) => null}
        />
      );
      const squares = screen.getAllByRole("cell");
      const squareClass = squares.slice(0, 5).concat(squares.slice(7, 8));
      const squareClickedClass = squares.slice(5, 7).concat(squares.slice(8));

      expect(
        squareClass.every((square) => square.className === "square")
      ).toBeTruthy();
      expect(
        squareClickedClass.every(
          (square) => square.className === "square-clicked"
        )
      ).toBeTruthy();
    });
  });
});
