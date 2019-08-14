import React, { Component } from 'react';

class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: this.props.name,
        color: this.props.color,
        position: {
            x: this.props.x,
            y: this.props.y
        },
        src: this.props.src
        };
    }

    get position() {
        return this.state.position;
    }

    set position({x, y}) {
        this.setState({
            position: {x, y}
        });
    }

    render() {
        return(
            <img src={this.state.src} alt={this.state.name} />
        );
    }
}

export default Piece;