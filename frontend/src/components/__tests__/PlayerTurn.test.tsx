import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { CancelablePromise, MoveRequest, MakeMoveService } from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";

describe("When a player makes a move", () => {
  const callApiSpy = jest.spyOn(MakeMoveService, "makeMove");

  beforeEach(() => {
    callApiSpy.mockImplementation((requestBody: MoveRequest) => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", ""],
        });
      });
    });
  });

  it("the board is fetched", async () => {
    render(<BoardContainer setError={(error: any) => error} />);
    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    await waitFor(() => expect(callApiSpy).toHaveBeenCalledTimes(1));
    screen.debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
