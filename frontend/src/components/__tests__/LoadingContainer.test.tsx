import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardContainer from "../BoardContainer";

describe("When the board container is still loading", () => {
  it("it renders the loading component", () => {
    render(
      <BoardContainer handleError={(error: boolean) => null} board={""} />
    );
    const progressBar = screen.getByTestId("progress-container");
    expect(progressBar).toBeInTheDocument;
  });
});
