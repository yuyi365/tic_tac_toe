import { render, waitFor } from "@testing-library/react";
import { CancelablePromise, GetBoardService } from "../../client";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { act } from "react-dom/test-utils";

describe("When the component loads", () => {
  const callApiSpy = jest.spyOn(GetBoardService, "getBoard");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gets a board if the request is valid", async () => {
    callApiSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        resolve({
          slots: ["🦄", "🍄", "", "", "", "", "", "", "🦄"],
        });
      });
    });
    act(() => {
      render(<BoardContainer setError={(error: any) => error} />);
    });
    await waitFor(() => expect(callApiSpy).toHaveBeenCalledTimes(1));
  });

  it("does not get a board if the request is invalid", async () => {
    callApiSpy.mockImplementation(() => {
      return new CancelablePromise((resolve, reject) => {
        reject("error");
      });
    });
    act(() => {
      render(<BoardContainer setError={(error: any) => error} />);
    });
    await waitFor(() => expect(callApiSpy).toHaveBeenCalledTimes(1));
  });
});
