import React from "react";

  function Moves(props){
    const listStyle = {
      display: "flex",
      flexDirection: props.gameState.movesAscending ? "column" : "column-reverse"
    }
    return <ol style={listStyle}>{props.history.map((step, moveNumber) => {
      const description = moveNumber ? `Go to move no. ${moveNumber} (${props.current.clickedOrder[moveNumber - 1][0]} at ${props.current.clickedOrder[moveNumber - 1][1]})` : `Go to game start`;
      return (<li key={moveNumber}><button onClick={()=> props.jumpTo(moveNumber)}>
      {description} 
      </button></li>)})}</ol>
  }

  export default Moves;