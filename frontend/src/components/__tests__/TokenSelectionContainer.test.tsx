import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TokenSelectionContainer from "../TokenSelectionContainer";

describe("Token selection container component", () => {
  it("initially renders on the screen with all four token options for each player", () => {
    render(
      <TokenSelectionContainer
        handleStartGame={() => null}
        setPlayerOneToken={() => null}
        setPlayerTwoToken={() => null}
        playerOneToken={""}
        playerTwoToken={""}
      />
    );

    const tokens = screen.getAllByRole("option");
    expect(tokens).toHaveLength(8);
  });

  it("initially renders on the screen with all three token options for player two and removes player one's token from the options", () => {
    render(
      <TokenSelectionContainer
        handleStartGame={() => null}
        setPlayerOneToken={() => null}
        setPlayerTwoToken={() => null}
        playerOneToken={"🍄"}
        playerTwoToken={""}
      />
    );

    const tokens = screen.getAllByRole("option");
    const playerTwoOptions = tokens.slice(4, 8);

    expect(tokens).toHaveLength(7);
    expect(playerTwoOptions[0]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[1]).not.toHaveTextContent("🍄");
    expect(playerTwoOptions[2]).not.toHaveTextContent("🍄");
  });
});
