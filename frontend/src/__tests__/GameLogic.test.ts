import calculateWinner from "../gamelogic";

describe("The game logic", () => {
    it("outputs the winner and winning tic-tac-toe combination", () => {
      
    const expectedResult = {
        winner: "X",
        winningSquares: [0,1,2]
    }
        
      const board = ["X", "X", "X", "-", "-", "-", "-", "-", "-"]

      expect(calculateWinner(board)).toEqual(expectedResult);
    });
  });

  describe("The game logic", () => {
    it("outputs null if there is no winner", () => {
      
    const expectedResult = null
        
      const board = ["X", "X", "-", "-", "X", "-", "X", "-", "-"]

      expect(calculateWinner(board)).toEqual(expectedResult);
    });
  });
  