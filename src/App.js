import React, { Component } from 'react';
import Board from './components/board/board.js';

class App extends Component {
  render() {
    return (
      <div className="Board" >
        <Board />
      </div>
    );
  }
}

export default App;
