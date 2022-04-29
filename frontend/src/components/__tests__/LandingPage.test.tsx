import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../LandingPage";

describe("When the page loads", () => {
  it("it renders the landing page component with correct buttons", () => {
    render(
      <LandingPage handleNewGame={() => null} handleResumeGame={() => null} />
    );

    const newGameButton = screen.getByTestId("landing-button-one");
    const resumeGameButton = screen.getByTestId("landing-button-two");

    expect(newGameButton).toBeInTheDocument;
    expect(resumeGameButton).toBeInTheDocument;
  });
});
