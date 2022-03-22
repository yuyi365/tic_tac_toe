import { render, screen } from "@testing-library/react";
import Board from "../Board";

const loadSubject = () => {
  render(<Board />);
};

describe("Board Component", () => {
  it("Renders 9 Square components", () => {
    loadSubject();
    const squares = screen.getAllByRole("cell");
    expect(squares).toHaveLength(9);
  });
});
