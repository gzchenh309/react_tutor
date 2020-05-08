import React from 'react';

function Square(props) {
  const winnerStyle={color:'red'};
  if (props.winner) {
    return (
      <button className="square" onClick={props.onClick} style={winnerStyle}>
        {props.value}
      </button>
    );
  }
  else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}  

  export default Square;