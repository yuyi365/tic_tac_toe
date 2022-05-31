import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Token from "../Token";

describe("Token component", () => {
  it("renders on the screen for one of the tokens", () => {
    render(<Token token={"👑"} setPlayerToken={() => null} />);
    const token = screen.getAllByRole("option");
    expect(token).toHaveLength(1);
    expect(token[0]).toHaveTextContent("👑");
  });
});
