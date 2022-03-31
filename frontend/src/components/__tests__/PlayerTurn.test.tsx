import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";
import { MakeMoveService } from "../../client";

describe("When a player places a 🦄 token on an empty board", () => {
  it("The token turn switches to 🍄", () => {
    // jest
    //   .spyOn(MakeMoveService, "makeMove")
    //   .mockImplementation((requestBody: MoveRequest) =>
    //     Promise.resolve({ slots: ["🦄", "", "", "", "", "", "", "", ""] })
    //   );

    render(
      <BoardContainer
        board={["", "", "", "", "", "", "", "", ""]}
        setBoard={(board: any) => board}
        setError={(error: any) => error}
      />
    );

    const square = screen.getAllByRole("cell")[0];
    fireEvent.click(square);
    const result = screen.findAllByDisplayValue("It's your turn, player: 🍄");
    screen.debug();
    expect(result).toBeInTheDocument();
  });
});

// const { container } = render(<BoardContainer />);
//     const turn = container.getElementsByClassName("results");
//     expect(turn[0]).toHaveTextContent("It's your turn, player: 🦄");
//     const squares = container.getElementsByClassName("square");
//     fireEvent.click(squares[0]);
//     expect(turn[0]).toHaveTextContent("It's your turn, player: It's your turn, player:");
