import React from "react";

function Square(props) {
    const conditionalColor = {
      backgroundColor: props.isGameEnder ? "red" : "#fff"
    }
    return (
      <button className="square"
              onClick={props.onClick}
              style={conditionalColor}>
        {props.value}
      </button>
    );
  }

  export default Square;