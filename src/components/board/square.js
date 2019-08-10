import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { SQUARE_SIDE_LENGTH } from '../../constants/constants.js';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            color: this.props.backgroundColor,
            currentPiece: null
        };
    }
    render() {
        return (
            <Col sm={3} style={{ 
                width: SQUARE_SIDE_LENGTH,
                height: SQUARE_SIDE_LENGTH, 
                backgroundColor: this.state.color
             }}></Col>
        );
    }
}

export default Square;