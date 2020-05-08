import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import Board from './Board';

class Game extends React.Component {
    maxStep=9;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            btnClicked: [],
            dispOrder: 'asc'
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let currentBtnClicked = this.state.btnClicked.slice(0,this.state.stepNumber);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        currentBtnClicked=currentBtnClicked.concat(i);
        squares[i] = this.state.xIsNext ? 'x' : 'o';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            btnClicked: currentBtnClicked
        });
    }

    handleChange(e){
        console.log("option changed!");
        console.log(e.target.value);

        this.setState({
            dispOrder: e.target.value
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        const someoneWin = calculateWinner(current.squares);
        const winner=someoneWin?someoneWin[0]:null;
        const winloc=someoneWin?someoneWin.slice(1):null;

        console.log("about to render the Game");
        if ( someoneWin) {
            console.log("winner!");
            console.log(winloc);
        }

        let moves = history.map((step, move) => {
            let desc = move ?
                'Go to move #' + move:
                'Go to game start';

            let i, row, col, loc, btnDesc;
            if ( move) {
                // coordinate 
                i = this.state.btnClicked[move-1];
                row = Math.trunc(i / 3);
                col = i % 3;
                loc = ` row ${row}, column ${col}`;    

                desc=desc.concat(loc);
            }

            const btnStyle={color:'red'};

            if (move === this.state.stepNumber ) {
                return (
                    <li key={move}>
                        <button style={btnStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }

        });

        if ( this.state.dispOrder==='dsc') {
            moves=moves.reverse();
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber < this.maxStep) {
            status = 'Next player: ' + (this.state.xIsNext ? 'x' : 'o');
        } else {
            status = 'It is a draw';
        }

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            winnerLoc={winloc}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <select name="disp" className="game-options" 
                    value={this.state.dispOrder} 
                    onChange={this.handleChange}>
                    <option value="asc">Ascend</option>
                    <option value="dsc">Descend</option>
                </select>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a],a,b,c];
      }
    }
    return null;
  }