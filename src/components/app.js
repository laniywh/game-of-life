import React, { Component } from 'react';
import Board from '../containers/board';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>Game of Life</div>
        <Board />
      </div>
    );
  }
}
