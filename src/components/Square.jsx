import React from "react";

function Square(props) {
    // if the game is over, the game-winning squares will be rendered red instead of white.
    const conditionalColor = {
      backgroundColor: props.isGameEnder ? "red" : null
    }
    // handleSquareClick() is being passed in all the way from <Game> through <Board> to here.
    // X, O, or null will be passed in as props.value out of the array of squares.
    return (
      <button className="square"
              onClick={props.onClick}
              style={conditionalColor}>
        {props.value}
      </button>
    );
  }

  export default Square;