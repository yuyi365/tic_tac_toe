import { render, waitFor } from "@testing-library/react";
import { CancelablePromise, GetBoardService } from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { act } from "react-dom/test-utils";

describe("When the component loads", () => {
  const callGetBoardSpy = jest.spyOn(GetBoardService, "getBoard");
  const playerOneToken = "🦄";
  const playerTwoToken = "🍄";

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
          setError={(error: any) => error}
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
    const mockSetError = jest.fn((error) => null);
    act(() => {
      render(
        <BoardContainer
          setError={mockSetError}
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
