import React, { Component } from 'react';

class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      color: this.props.color
    }
  }

  render() {
    const { src } = this.props;
    return(
      <img src={src} alt="" />
    );
  }
}
  

export default Piece;