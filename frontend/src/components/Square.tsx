import { useState } from "react";
import { MakeMoveService } from "../client";

type SquareProps = {
  index: number;
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  gameWinner: string | undefined;
  isInWinningCombo: boolean | undefined;
};

const Square = (props: SquareProps) => {
  const [click, setClick] = useState<Boolean>(false);
  const setBoard = props.setBoard;

  const token = "🦄";

  async function makeMove() {
    const moveResponse = await MakeMoveService.makeMove({
      slot_index: props.index,
    });
    setBoard(moveResponse.slots);
  }

  const handleOnClick = () => {
    setClick(!click);
    makeMove();
  };

  return props.gameWinner === "X" && props.isInWinningCombo ? (
    <td className="square-won">{click ? token : ""}</td>
  ) : (
    <td
      className={props.gameWinner !== "X" ? "square" : "square-clicked"}
      onClick={props.gameWinner !== "X" ? handleOnClick : undefined}
    >
      {click ? token : ""}
    </td>
  );
};

export default Square;
