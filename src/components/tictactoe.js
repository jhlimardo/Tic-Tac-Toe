import React, { useState } from 'react';


// const rowStyle = {
//   display: 'flex'
// }

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'grid',
  'flexDirection': 'column',
  'border': '3px #eee solid',
  'grid-template': 'repeat(3, 1fr) / repeat(3, 1fr)'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const Square = ({ value, onClick }) => {
  const style = value ? `squares ${value}` : `squares`;
    return (
      // <div
      //   className="square"
      //   style={squareStyle}>
      // </div>
      <button className={style} style={squareStyle} onClick={onClick}>
      {value}
    </button>
    );
 
}

const Board = ({ squares, onClick, winner, xO, renderMoves}) => {
 
  
    return (
      <div style={containerStyle} className="gameBoard">
        {/* {renderMoves()} */}
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: 
        <span>{!winner ? xO : ""}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: 
      <span>{winner ? winner : ""}</span></div>
        <button style={buttonStyle} onClick = {renderMoves}>Reset</button>
        <div style={boardStyle}>
          
          {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
          ))}
          
        </div>
      </div>
    );

}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  
  
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
  
  // const renderMoves = () =>
  //   history.map((_step, move) => {
  //     const destination = move ? `Go to move #${move}` : "Go to Start";
  //     return (
  //       <li key={move}>
  //         <button onClick={() => jumpTo(move)}>{destination}</button>
  //       </li>
  //     );
  //   });

    const renderMoves = () =>
    history.map((_step, move) => {
      const destination = !move ? jumpTo(move) : null;
      return destination
    });


const gameWinner = (squares) => {
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
        return squares[a];
      }
    }
    return null;
  }

  const winner = gameWinner(history[stepNumber]);

  


    return (
      <div className="game">
        <div className="game-board">
          <Board squares={history[stepNumber]} onClick={handleClick} winner={winner} xO={xO} renderMoves={renderMoves}/>
        </div>
        <div>
          {/* <h3>History</h3>
          {renderMoves()} */}
        </div>
      </div>
      
    );
  
}


