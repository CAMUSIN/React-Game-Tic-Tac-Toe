import { WINNING_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
  //revisamos combinaciones ganadoras
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  //si no hay ganador, devolvemos null
  return null;
};

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((cell) => cell !== null);
};
