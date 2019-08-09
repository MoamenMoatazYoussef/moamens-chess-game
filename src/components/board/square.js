import React, {Component} from 'react';
import { Col } from 'react-bootstrap';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            color: this.props.color,
            currentPiece: null
        };
    }

    render() {
        
        return(
            <Col sm="1"></Col>
        );
    }
}

export default Square;