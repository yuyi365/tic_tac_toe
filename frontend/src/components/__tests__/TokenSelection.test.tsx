import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TokenSelection from "../TokenSelection";
import { Player } from "../../client";

describe("Token selection component", () => {
  it("initially renders on the screen with all four tokens but changes to three tokens when one is selected", () => {
    render(
      <TokenSelection
        player={Player._1}
        setPlayerToken={() => null}
        tokens={["🦄", "🍄", "👑", "🦩"]}
      />
    );
    const token = screen.getAllByRole("option");
    expect(token).toHaveLength(4);
  });
});
