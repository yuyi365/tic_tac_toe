import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";

describe("When a player places a 🦄 token on an empty board", () => {
  it("The token turn switches to 🍄", () => {
    const { container } = render(<BoardContainer />);
    const turn = container.getElementsByClassName("results");
    expect(turn[0]).toHaveTextContent("It's your turn, player: 🦄");
    const squares = container.getElementsByClassName("square");
    fireEvent.click(squares[0]);
    expect(turn[0]).toHaveTextContent("It's your turn, player: 🍄");
  });
});
