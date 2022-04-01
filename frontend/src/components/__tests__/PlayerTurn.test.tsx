import { render, screen, fireEvent } from "@testing-library/react";
import { CancelablePromise, MoveRequest, MakeMoveService } from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import Board from "../Board";

// describe("When a player places a 🦄 token on an empty board", () => {
//   it("The token turn switches to 🍄", () => {
//     const mockHandleMove = jest.fn((index: number) => null);
//     render(
//       <BoardContainer
//         board={["", "", "", "", "", "", "", "", ""]}
//         setBoard={(board: any) => ["", "🍄", "", "", "", "", "", "", ""]}
//         setError={(error: any) => error}
//       />
//     );

//     const square = screen.getAllByRole("cell")[0];
//     fireEvent.click(square);
//     expect(mockHandleMove).toHaveBeenCalled();

//     //     // jest
//     //     //   .spyOn(MakeMoveService, "makeMove")
//     //     //   .mockImplementation((requestBody: MoveRequest) => {
//     //     //     return new CancelablePromise((resolve, reject) => {
//     //     //       resolve({
//     //     //         slots: ["🦄", "🍄", "", "", "", "", "", "", ""],
//     //     //       });
//     //     //     });
//     //     //   });
//     screen.debug();
//   });
// });

describe("When a player places a 🦄 token on an empty board and when the post request is successful", () => {
  it("Token appears on the board", () => {
    const mockHandleMove = jest.fn((index: number) => null);
    render(
      <Board
        board={["", "🦄", "", "", "🍄", "🍄", "🦄", "", "🦄"]}
        gameWinner={""}
        turn={"🦄"}
        handleMove={mockHandleMove}
        setError={(error: any) => error}
      />
    );
    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    expect(mockHandleMove).toHaveBeenCalledWith(0);
  });
});
