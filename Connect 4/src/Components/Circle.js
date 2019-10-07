import React, { Component } from 'react'

export default class Circle extends Component {
    render() {
        var colour = this.props.colour

        return (
            <div className={colour}>

            </div>
        )
    }
}
