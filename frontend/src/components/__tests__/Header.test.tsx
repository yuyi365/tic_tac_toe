import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

const loadHeader = () => {
  render(<Header />);
};

describe("Header component", () => {
  it("Renders a heading with: 🦄 👑 Tic-Tac-Toe 🍄 🦩", () => {
    loadHeader();
    const headerElement = screen.getByRole("heading", {
      name: "🦄 👑 Tic-Tac-Toe 🍄 🦩",
    });
    expect(headerElement).toBeInTheDocument();
  });
});
