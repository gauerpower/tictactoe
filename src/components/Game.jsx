import React, {useState} from "react";
import Board from "../components/Board.jsx"
import Moves from "../components/Moves.jsx"

function Game() {

    const [gameState, setGameState] = useState({
      history: [{
              squares: Array(9).fill(null),
              clickedOrder: []
            }],
      stepNumber: 0,
      xIsNext: true,
      movesAscending: true
    })

    const [isGameOver, setGameOver] = useState({
      isOver: false,
      gameEndingSquares: []
    })


    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    
      // Checking every combination of squares that could be game-winning.
      // Reminder: The squares array in the gameState holds an array of X's, O's, or null's
      // depending on whether a square has been clicked and who did the clicking.
      // If all 3 values match, gameOver state is set to true + the game-ending array. 
      // The outer function returns either X or O depending on who won.
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          if (isGameOver.isOver === false) {
            setGameOver({
            isOver: true,
            gameEndingSquares: lines[i]
          })} return squares[a];
        }}
      return null;
    }

    // This function will be passed into <Board/> and then into each <Square/> as props.
    function handleSquareClick(i) {
      // Setting up deep copy of history from state object
      // and the array of squares for the current turn
      const history = gameState.history.slice(0, gameState.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      // Setting up grid coordinates for each square's index value
      // and specifying which player placed on that square
      const coordinate = (function(index) {
        const coordinate = []
        switch(index) {
        case 0:
          coordinate.push("A-1");
          break;
        case 1:
          coordinate.push("A-2");
          break;
        case 2:
          coordinate.push("A-3");
          break;
        case 3:
          coordinate.push("B-1");
          break;
        case 4:
          coordinate.push("B-2");
          break;
        case 5:
          coordinate.push("B-3");
          break;
        case 6:
          coordinate.push("C-1");
          break;
        case 7:
          coordinate.push("C-2");
          break;
        case 8:
          coordinate.push("C-3");
          break;
        default:
          break;
      }
      gameState.xIsNext ? coordinate.unshift("X") : coordinate.unshift("O");
      return coordinate;
    })(i);

      // Adding the coordinate of the clicked square to the clickedOrder array
      // (clickedOrder array will hold coordinates, whereas squares array will hold X/O at indices)
      // (there's probably a cleaner way to refactor this but I don't feel like it rn)
      
      const oldClickedOrder = current.clickedOrder.slice();
      oldClickedOrder.push(coordinate);
      const newClickedOrder = oldClickedOrder.slice();

      // if calculateWinner returns anything other than null, the function will stop.
      // If squares[i] has a non-null value, it means the square has already been clicked,
      // so the function will stop (in order to prevent overriding a taken square).
      // If neither of these conditions are met, the function continues.
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // Placing either an X or O on the clicked square's index in the Squares array,
      // which we'll add into the next nested object in the History array in the State
      squares[i] = gameState.xIsNext ? "X" : "O";

      // Updating the game state for the most recently clicked square.
      // Adds a new squares/clickedOrder object into the history array.
      // De facto increments the stepNumber (since the length of the history array is increasing.)
      // Toggles which player is next.
      // movesAscending doesn't change.
      setGameState({
        history: history.concat([{
          squares: squares,
          clickedOrder: newClickedOrder
        }]),
        stepNumber: history.length,
        xIsNext: !gameState.xIsNext,
        movesAscending: gameState.movesAscending})
    }

    // Now we're outside of the scope of the handleSquareClick() function,
    // so we need to declare these const's again (now just within the scope of <Game>)
    const history = gameState.history;
    const current = history[gameState.stepNumber];


    // This will be the handler for each rewind button in <Moves/>.
    // gameState history array will be truncated to the length of the index of the clicked button,
    // stepNumber will be set to that index, xIsNext will be set based on even/odd.
    // movesAscending will not change. (Could have used a spread operator but w/e, one line either way.)
    // If the gameOver was previously true, it will be reset to false and the array of
    // square indices that ended the game will be cleared.
    function jumpTo(step) {
      setGameState({
        history: gameState.history.slice(0, step + 1),
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        movesAscending: gameState.movesAscending
      });
      if (isGameOver.isOver) {
        setGameOver({
          isOver: false,
          gameEndingSquares: []
        })
      }
    }
    // winner will be set as either X or O if the for loop finds a match,
    // otherwise it will return null.
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`
    } else if (current.squares.includes(null)){
      status = `Next player: ${gameState.xIsNext ? "X" : "O"}`;
    } else {
      // If winner is null and none of the values in the squares array are null,
      // the board has been filled without any 3-in-a-row values, so the
      // game is a draw.
      status = "Draw";
    }

    function flipButtons() {
      setGameState({
        ...gameState,
        movesAscending: !gameState.movesAscending
      });
    }

    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div className="game-board">
          <Board squares={current.squares} isGameOver={isGameOver} onClick={(i)=> handleSquareClick(i)}/>
        </div>
        <div className="game-info">
          <div className="game-status">{status}</div>
          {gameState.history.length > 1 ? <div className="button-area">
          <Moves jumpTo={jumpTo} gameState={gameState} history={history} current={current}/>
          <button onClick={flipButtons}>Flip buttons</button>
          </div> : null}
        </div>
      </div>
    );
  }

export default Game;