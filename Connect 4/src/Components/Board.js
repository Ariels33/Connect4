import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NextPlayer: 'Y',
            playerID: null,
            Winner: false,
            Data:
                [
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null]
                ]
        }
    }

    fetchData(i) {

        fetch('http://127.0.0.1:5000/',
            {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    col: i,
                    reset: 0,
                    player: this.state.playerID,
                })
            }

        )
            .then(response => response.json())
            .then(data => this.setState({ Data: data.board }));
    }

    refreshData() {

        fetch('http://127.0.0.1:5000/')
            .then(response => response.json())
            .then(data => this.setState({ Data: data.board }));

    }

    setPlayer() {
        if (this.state.playerID === null) {

            fetch('http://127.0.0.1:5000/name')
            
                .then(response => response.json())
                .then(data => this.setState({ playerID: data.player }));

        }
    }

    refreshTrigger() {
        let timerId = setInterval(() => this.refreshData(), 2000);
    }

    resetData() {

        this.refreshData()

        fetch('http://127.0.0.1:5000/',
            {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    col: 0,
                    reset: 1,
                    player: this.state.playerID,
                })
            }

        )
            .then(response => response.json())
            .then(data => this.setState({ Data: data.board }));
    }

    render() {

        let board = [];
        for (let y = 5; y > -1; y--) {
            let row = [];
            for (let x = 0; x < 7; x++) {
                row.push(null)
                board.push(<Square y={y} x={x} board={this.state.Data} update={this.fetchData.bind(this)} />);
            }
        }
        return (

            <body className={'board'}>
                <div>
                    {board}
                </div>

                <button onClick={() => this.resetData()}>
                    reset
                </button>

                <div>

                </div>

                <button onClick={() => this.refreshTrigger()}>
                    refresh
                </button>

                <div>

                </div>

                <button onClick={() => this.setPlayer()}>
                    set player
                </button>

                <div>
                    Player ID is: {this.state.playerID}
                </div>


            </body>



        )
    }
}
