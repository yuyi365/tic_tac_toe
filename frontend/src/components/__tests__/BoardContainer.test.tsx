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
import { AppState } from "../../appStates";

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

  it("the makeMove service returns by calling getBoard service when the user clicks a square on the board", async () => {
    act(() => {
      render(
        <BoardContainer
          gameId={10}
          handleAppState={(appstate: AppState) => null}
        />
      );
    });
    await waitFor(() => callMakeMoveSpy);
    const square = screen.getAllByRole("cell")[3];
    fireEvent.click(square);
    await waitFor(() => expect(callGetBoardSpy).toHaveBeenCalledTimes(1));
  });
});

describe("When a player makes a move", () => {
  it("getBoard service is not called and the app state changes to an error state if the move is invalid", async () => {
    const mockSetErrorState = jest.fn((error) => null);
    act(() => {
      render(<BoardContainer gameId={10} handleAppState={mockSetErrorState} />);
    });
    await waitFor(() =>
      callMakeMoveSpy.mockImplementation(
        (gameId: number, requestBody: MoveRequest) => {
          return new CancelablePromise((resolve, reject) => {
            reject("error");
          });
        }
      )
    );

    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);

    await waitFor(() => callMakeMoveSpy);
    await waitFor(() => expect(mockSetErrorState).toHaveBeenCalledTimes(1));
  });
});
