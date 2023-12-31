import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { Winner } from "./components/Winner.jsx";

function App() {
  const [board, setBoard] = useState(() =>{
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() =>{
    const savedTurn = localStorage.getItem("turn");
    return savedTurn ? JSON.parse(savedTurn) : TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    //No sobre escribe celda
    if (board[index] || winner) return;

    //actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //actualiza el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar partida en localstorage
    localStorage.setItem("board", JSON.stringify(newBoard));
    localStorage.setItem("turn", JSON.stringify(newTurn));

    //comprueba ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    localStorage.removeItem("board");
    localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={handleReset}>Reset Juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>❌</Square>
        <Square isSelected={turn === TURNS.O}>⭕</Square>
      </section>
      <Winner winner={winner} handleReset={handleReset}></Winner>
    </main>
  );
}

export default App;
