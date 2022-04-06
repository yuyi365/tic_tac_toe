import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorContainer from "../ErrorContainer";

describe("When the board does not have board information", () => {
  it("it renders the error component", () => {
    render(<ErrorContainer />);
    const errorDiv = screen.getByTestId("error-container");
    expect(errorDiv).toBeInTheDocument;
  });

  it("the error container reloads if the user clicks the try-again button", () => {
    render(<ErrorContainer />);
    const errorButton = screen.getByTestId("try-again-button");
    expect(errorButton).toBeInTheDocument;
  });
});
