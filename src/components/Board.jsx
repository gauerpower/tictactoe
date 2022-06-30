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
      return (
        <div>
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