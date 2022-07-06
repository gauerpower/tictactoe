import React from "react";

  function Moves(props){
    // Depending on movesAscending in the state, the movelist will conditionally 
    // render either ascending or descending.
    const listStyle = {
      display: "flex",
      flexDirection: props.gameState.movesAscending ? "column" : "column-reverse"
    }
    // The map function will make an array of list items, each of which contains
    // a button with the move number and the player/coordinate of what was placed
    // during that move. When clicked, the jumpTo function will run
    // and backtrack the game to that turn.
    return <ul style={listStyle}>{props.history.map((step, moveNumber) => {
      const description = moveNumber
      ? `Go to move ${moveNumber} (${props.current.clickedOrder[moveNumber - 1][0]} at ${props.current.clickedOrder[moveNumber - 1][1]})`
      : `Go to game start`;
      return (<li key={moveNumber}><button onClick={()=> props.jumpTo(moveNumber)}>
      {description} 
      </button></li>)})}</ul>
  }

  export default Moves;