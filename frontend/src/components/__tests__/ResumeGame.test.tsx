import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumeGame from "../ResumeGame";

describe("When the component loads", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When the resume game component loads", () => {
    it("it renders the resume game form", () => {
      render(<ResumeGame handleUpdateGameIdGetBoard={(gameId: any) => null} />);
      const resumeGameForm = screen.getByTestId("resume-game-form");
      expect(resumeGameForm).toBeInTheDocument;
    });
  });

  describe("When the user clicks submit on the form", () => {
    it("it calls the findGame function", () => {
      const mockUpdateGameIdGetBoard = jest.fn((e: any) => undefined);
      render(
        <ResumeGame handleUpdateGameIdGetBoard={mockUpdateGameIdGetBoard} />
      );

      const resumeGameButton = screen.getByTestId("pin-complete-button");
      fireEvent.click(resumeGameButton);
      expect(mockUpdateGameIdGetBoard).toHaveBeenCalledTimes(1);
    });
  });
});
