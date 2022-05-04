import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TokenSelectionContainer from "../TokenSelectionContainer";
import { AppState } from "../../appStates";
import {
  CancelablePromise,
  MakeSettingsService,
  SettingsRequest,
} from "../../client";

const callMakeSettingSpy = jest.spyOn(MakeSettingsService, "makeSettings");

describe("Token selection container component", () => {
  it("initially renders on the screen with all four token options for each player", () => {
    render(
      <TokenSelectionContainer
        handleAppState={(appState: AppState) => null}
        gameId={10}
      />
    );

    const tokens = screen.getAllByRole("option");
    expect(tokens).toHaveLength(8);
  });

  it("initially renders on the screen with all three token options for player two and removes player one's token from the options", () => {
    render(
      <TokenSelectionContainer
        handleAppState={(appState: AppState) => null}
        gameId={10}
      />
    );

    const playerOneMushroom = screen.getByTestId("1-🍄");
    fireEvent.click(playerOneMushroom);
    const tokensAfterClick = screen.getAllByRole("option");
    const playerTwoOptions = tokensAfterClick.slice(4, 8);

    expect(tokensAfterClick).toHaveLength(7);
    expect(playerTwoOptions[0]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[1]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[2]).not.toHaveTextContent("🍄");
  });
});

describe("Token selection container component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("changes app state to error when the user clicks the submit button", async () => {
    const mockUpdateAppState = jest.fn((appState: AppState) => null);
    callMakeSettingSpy.mockImplementation(
      (gameId: number, requestBody: SettingsRequest) => {
        return new CancelablePromise((resolve, reject) => {
          reject("error");
        });
      }
    );
    render(
      <TokenSelectionContainer
        handleAppState={mockUpdateAppState}
        gameId={20}
      />
    );

    const playerOneMushroom = screen.getByTestId("1-🍄");
    fireEvent.click(playerOneMushroom);

    const playerTwoCrown = screen.getByTestId("2-👑");
    fireEvent.click(playerTwoCrown);

    const tokensAfterClick = screen.getAllByRole("option");
    expect(tokensAfterClick).toHaveLength(6);

    const submitButton = screen.getByTestId("token-complete-button");
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockUpdateAppState).toHaveBeenCalledTimes(1));
  });

  it("changes app state to the board when the user clicks the submit button", async () => {
    const mockUpdateAppState = jest.fn((appState: AppState) => null);
    callMakeSettingSpy.mockImplementation(
      (gameId: number, requestBody: SettingsRequest) => {
        return new CancelablePromise((resolve, reject) => {
          resolve({ response: 201 });
        });
      }
    );
    render(
      <TokenSelectionContainer
        handleAppState={mockUpdateAppState}
        gameId={20}
      />
    );

    const playerOneMushroom = screen.getByTestId("1-🍄");
    fireEvent.click(playerOneMushroom);

    const playerTwoCrown = screen.getByTestId("2-👑");
    fireEvent.click(playerTwoCrown);

    const tokensAfterClick = screen.getAllByRole("option");
    expect(tokensAfterClick).toHaveLength(6);

    const submitButton = screen.getByTestId("token-complete-button");
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockUpdateAppState).toHaveBeenCalledTimes(1));
  });
});
