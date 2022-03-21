import { useState } from "react";
import { DefaultService } from "../client";

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
    const moveResponse = await DefaultService.createMoveMovePost({
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

  return props.gameWinner && props.isInWinningCombo ? (
    <td className="square-won">
      {click ? props.gameWinner : props.board[props.index]}
    </td>
  ) : (
    <td className={click ? "square-clicked" : "square"} onClick={handleOnClick}>
      {click ? props.board[props.index] : ""}
    </td>
  );
};

export default Square;
