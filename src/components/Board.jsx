import React from "react";
import Square from "../components/Square.jsx"

function Board(props) {
    function renderSquare(i) {
      return <Square value={props.squares[i]}
                    onClick={()=>props.onClick(i)}
                    key = {i}
                    isGameEnder={props.isGameOver.isOver && props.isGameOver.gameEndingSquares.includes(i)
                                ? true : false}
      />;
    }
    // Using nested maps to create the board. Rows will be labeled 0/1/2,
    // squares will be created with a math problem based on the row number.
      return (
        <div className="board">
          {[0, 1, 2].map(row => {
            return <div className="board-row" key={row}>
              {[0, 1, 2].map((square) => {
                return renderSquare(square + row*3)
              })}
            </div>
          })}
         
        </div>
      );
  }

  export default Board;