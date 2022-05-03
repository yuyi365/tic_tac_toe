import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TokenSelectionContainer from "../TokenSelectionContainer";
import { AppState } from "../../utils";
import {
  CancelablePromise,
  MakeSettingsService,
  SettingsRequest,
  Player,
} from "../../client";

const callMakeSetting = jest.spyOn(MakeSettingsService, "makeSettings");

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
    const tokens = screen.getAllByRole("option");

    fireEvent.click(playerOneToken);
    const playerTwoOptions = tokens.slice(4, 8);

    expect(tokens).toHaveLength(7);
    expect(playerTwoOptions[0]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[1]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[2]).not.toHaveTextContent("🍄");
  });
});

describe("Token selection container component", () => {
  it("changes app state when the user clicks the submit button", () => {
    const mockUpdateAppState = jest.fn((appState: AppState) => undefined);
    render(
      <TokenSelectionContainer
        handleAppState={mockUpdateAppState}
        gameId={10}
      />
    );
    const submitButton = screen.getByTestId("token-complete-button");
    fireEvent.click(submitButton);
    callMakeSetting.mockImplementation(
      (gameId: number, requestBody: SettingsRequest) => {
        return new CancelablePromise((resolve, reject) => {
          resolve({
            slots: ["", "", "", "", "", "", "", "", ""],
            next_turn: Player._1,
            next_turn_token: "🍄",
          });
        });
      }
    );
    expect(mockUpdateAppState).toHaveBeenCalledTimes(1);
  });
});
