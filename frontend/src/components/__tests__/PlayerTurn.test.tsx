import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { CancelablePromise, MoveRequest, MakeMoveService } from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { act } from "react-dom/test-utils";

describe("When a player makes a move", () => {
  const callApiSpy = jest.spyOn(MakeMoveService, "makeMove");

  it("the board is fetched", async () => {
    callApiSpy.mockImplementation((requestBody: MoveRequest) => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", ""],
        });
      });
    });
    act(() => {
      render(<BoardContainer setError={(error: any) => error} />);
    });
    const square = screen.getAllByRole("cell")[3];
    fireEvent.click(square);
    await waitFor(() => expect(callApiSpy).toHaveBeenCalledTimes(1));
    screen.debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
