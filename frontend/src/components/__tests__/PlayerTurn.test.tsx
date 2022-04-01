import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { CancelablePromise, MoveRequest, MakeMoveService } from "../../client";

describe("When a player places a 🦄 token on an empty board", () => {
  it("The token turn switches to 🍄", () => {
    const mockHandleMove = jest.fn((index: number) => null);
    render(
      <BoardContainer
        board={["", "🍄", "", "", "", "", "", "", ""]}
        setBoard={jest.fn(() => null)}
        setError={(error: any) => error}
      />
    );

    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    // jest
    //   .spyOn(MakeMoveService, "makeMove")
    //   .mockImplementation((requestBody: MoveRequest) => {
    //     return new CancelablePromise((resolve, reject) => {
    //       resolve({
    //         slots: ["🦄", "🍄", "", "", "", "", "", "", ""],
    //       });
    //     });
    //   });
    screen.debug();
    expect(mockHandleMove).toHaveBeenCalledWith(0);
  });
});
