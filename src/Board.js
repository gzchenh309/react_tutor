import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            winner:null
        };

        console.log("Board created!");
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const numbers = [0, 1, 2];
        const rows = numbers.map((rowNumber) => {
            const row = numbers.map((i) =>{
                let winnerSquare=false;
                if (this.props.winnerLoc && 
                    this.props.winnerLoc.includes(i+rowNumber * 3)) {
                        winnerSquare=true;
                    }

                return(
                <Square
                    value={this.props.squares[i + rowNumber * 3]}
                    onClick={() => this.props.onClick(i + rowNumber * 3)}
                    winner={winnerSquare}
                />)}
                );           

            return (
                <div className="board-row">
                    {row}
                </div>
            );
        });

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Board;