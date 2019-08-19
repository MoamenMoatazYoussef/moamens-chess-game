import React, { Component } from "react";



class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name, //TODO: get rid of name
      color: this.props.color,
      id: this.props.id,
      position: this.props.position
    };

    this.checkMove = this.checkMove.bind(this);
    this.getID = this.getID.bind(this);
  }

  checkMove() {
    return true;
  }

  getID() {
    return this.state.id;
  }

  getPosition() {
    return this.state.position;
  }

  setPosition(position) {
    this.setState({
      position
    });
  }

  setProps(name, color, id, position) {
    this.setState({
      name,
      color,
      id,
      position
    });
  }

  render() {
    const { src } = this.props;
    return <img src={src} alt="" />;
  }
}

export default Piece;
