import { useState } from "react";
import { MakeMoveService } from "../client";

type SquareProps = {
  index: number;
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  gameWinner: string | undefined;
  isInWinningCombo: boolean | undefined;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
};

const Square = (props: SquareProps) => {
  const [click, setClick] = useState<Boolean>(false);
  const setBoard = props.setBoard;

  async function makeMove() {
    const moveResponse = await MakeMoveService.makeMove({
      slot_index: props.index,
      token: props.turn,
    });
    setBoard(moveResponse.slots);
  }

  const handleOnClick = () => {
    setClick(!click);
    makeMove();
    if (props.turn === "🦄") {
      props.setTurn("🍄");
    } else {
      props.setTurn("🦄");
    }
  };

  const getClassNames = () => {
    if (!props.gameWinner) {
      return "square";
    } else if (props.isInWinningCombo) {
      return "square-won";
    } else {
      return "square-clicked";
    }
  };

  return (
    <td
      className={getClassNames()}
      onClick={!props.gameWinner ? handleOnClick : undefined}
    >
      {props.board[props.index]}
    </td>
  );
};

export default Square;
