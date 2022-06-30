import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.squares[i]}
                  onClick={()=>props.onClick(i)}
                  key = {i}
                  id={`squareNumber${i}`}
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
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          if (isGameOver.isOver === false) {
            setGameOver({
            isOver: true,
            gameEndingSquares: lines[i]
          })
        } console.log(isGameOver);
          return squares[a];
        }
      }
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
      function findCoordinate(index) {
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
    }
      const coordinate = findCoordinate(i);

      // if calculateWinner returns null AND squares[i] returns null, the code continues.
      // Otherwise, the function stops here.
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // Placing either an X or O on the clicked square's index in the Squares array in the State
      squares[i] = gameState.xIsNext ? "X" : "O";

      // Adding the coordinate of the clicked square to the clickedOrder array
      // (clickedOrder array will hold coordinates, whereas squares array will hold X/O at indices)
      // (there's probably a cleaner way to refactor this but I don't feel like it rn)
      const oldClickedOrder = current.clickedOrder.slice();
      oldClickedOrder.push(coordinate);
      const newClickedOrder = oldClickedOrder.slice();
      

      setGameState({
        history: history.concat([{
          squares: squares,
          clickedOrder: newClickedOrder
        }]),
        stepNumber: history.length,
        xIsNext: !gameState.xIsNext,
        movesAscending: gameState.movesAscending})
    }

    const history = gameState.history;
    const current = history[gameState.stepNumber];

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
        console.log(isGameOver)
      }
    }

    function Moves(){
      const listStyle = {
        display: "flex",
        flexDirection: gameState.movesAscending ? "column" : "column-reverse"
      }
      return <ol style={listStyle}>{history.map((step, moveNumber) => {
        const description = moveNumber ? `Go to move no. ${moveNumber} (${current.clickedOrder[moveNumber - 1][0]} at ${current.clickedOrder[moveNumber - 1][1]})` : `Go to game start`;
        return (<li key={moveNumber}><button onClick={()=> jumpTo(moveNumber)}>
        {description} 
        </button></li>)})}</ol>
    }

    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`
    } else if (current.squares.includes(null)){
      status = `Next player: ${gameState.xIsNext ? "X" : "O"}`;
    } else {
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
        <div className="game-board">
          {isGameOver.isOver ? <Board squares={current.squares} isGameOver={isGameOver}/> : <Board squares={current.squares} isGameOver={isGameOver} onClick={(i)=> handleSquareClick(i)}/>}
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Moves/>
          <button onClick={flipButtons}>Flip buttons</button>
        </div>
      </div>
    );
  }


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);