import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import {
  CancelablePromise,
  MoveRequest,
  MakeMoveService,
  GetBoardService,
  Player,
} from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { act } from "react-dom/test-utils";

const callMakeMoveSpy = jest.spyOn(MakeMoveService, "makeMove");
const callGetBoardSpy = jest.spyOn(GetBoardService, "getBoard");

describe("When a player makes a move", () => {
  beforeEach(() => {
    callMakeMoveSpy.mockImplementation(
      (gameId: number, requestBody: MoveRequest) => {
        return new CancelablePromise((resolve, reject) => {
          resolve({
            slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
            Player: Player._1,
          });
        });
      }
    );
    callGetBoardSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
          next_turn: Player._2,
          next_turn_token: "🍄",
        });
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("the makeMove service is called when the user clicks a square on the board", async () => {
    act(() => {
      render(
        <BoardContainer
          handleError={(error: boolean) => null}
          board={["🦄", "🍄", "", "", "", "", "", "", "🦄"]}
          winner={null}
          gameId={10}
          turn={Player._2}
          turnToken={"🍄"}
          setBoard={(board: Array<string>) => null}
          setTurn={(turn: Player) => null}
          setTurnToken={(turnToken: string) => null}
        />
      );
    });
    await waitFor(() => callMakeMoveSpy);
    await waitFor(() => callGetBoardSpy);
    const square = screen.getAllByRole("cell")[3];
    fireEvent.click(square);
    await waitFor(() => expect(callGetBoardSpy).toHaveBeenCalledTimes(1));
  });

  it("the player turn does not change if the move is invalid", async () => {
    const mockSetError = jest.fn((error) => null);
    act(() => {
      render(
        <BoardContainer
          handleError={mockSetError}
          board={["🦄", "🍄", "", "", "", "", "", "", "🦄"]}
          winner={null}
          gameId={10}
          turn={Player._1}
          turnToken={"🦄"}
          setBoard={(board: Array<string>) => null}
          setTurn={(turn: Player) => null}
          setTurnToken={(turnToken: string) => null}
        />
      );
    });
    await waitFor(() =>
      callMakeMoveSpy.mockImplementation(() => {
        return new CancelablePromise((resolve, reject) => {
          reject("error");
        });
      })
    );
    act(() => {
      const square = screen.getAllByRole("cell")[4];
      fireEvent.click(square);
    });
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(true);
    });
  });
});
