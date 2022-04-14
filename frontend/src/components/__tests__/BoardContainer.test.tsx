import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import {
  CancelablePromise,
  MoveRequest,
  MakeMoveService,
  GetBoardService,
} from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { act } from "react-dom/test-utils";

const callMakeMoveSpy = jest.spyOn(MakeMoveService, "makeMove");
const callGetBoardSpy = jest.spyOn(GetBoardService, "getBoard");
const playerOneToken = "🦄";
const playerTwoToken = "🍄";

describe("When the component loads", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gets a board if the request is valid", async () => {
    callGetBoardSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
        });
      });
    });
    act(() => {
      render(
        <BoardContainer
          handleError={(error: boolean) => null}
          playerOneToken={playerOneToken}
          playerTwoToken={playerTwoToken}
        />
      );
    });
    await waitFor(() => expect(callGetBoardSpy).toHaveBeenCalledTimes(1));
  });

  it("does not get a board if the request is invalid", async () => {
    callGetBoardSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        reject("error");
      });
    });
    const mockSetError = jest.fn((error: boolean) => null);
    act(() => {
      render(
        <BoardContainer
          handleError={mockSetError}
          playerOneToken={playerOneToken}
          playerTwoToken={playerTwoToken}
        />
      );
    });
    await waitFor(() => {
      expect(callGetBoardSpy).toHaveBeenCalledTimes(1);
      expect(mockSetError).toHaveBeenCalledWith(true);
    });
  });
});

describe("When a player makes a move", () => {
  beforeEach(() => {
    callMakeMoveSpy.mockImplementation((requestBody: MoveRequest) => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
        });
      });
    });
    callGetBoardSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
        });
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("the player turn changes from 🦄 to 🍄 if the move is valid", async () => {
    act(() => {
      render(
        <BoardContainer
          handleError={(error: boolean) => null}
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
        />
      );
    });
    await waitFor(() => callMakeMoveSpy);
    await waitFor(() =>
      callGetBoardSpy.mockImplementation(() => {
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
