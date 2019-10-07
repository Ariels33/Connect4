import React, { Component } from 'react'
import Circle from './Circle'

export default class Square extends Component {
    render() {
        var colour = 'none'
        var win = 'null'

        var Board = this.props.board

        if (Board[this.props.x][this.props.y] === 'Y') {
            colour = 'yel'
        }
        else if (Board[this.props.x][this.props.y] === 'R') {
            colour = 'red'
        }
        else if (Board[this.props.x][this.props.y] === 'WY') {
            win = 'winyel'
            colour = 'yel'
        }
        else if (Board[this.props.x][this.props.y] === 'WR') {
            win = 'winred'
            colour = 'red'
        }
        return (
            <div className={'cell ' +win} onClick={() => this.props.update(this.props.x)}>
                <Circle colour={colour} />
            </div>
        )
    }
}
