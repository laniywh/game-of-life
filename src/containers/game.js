import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from './board';
import { toggleCell, saveInterval, newGeneration } from '../actions/index';

class Game extends Component {
  componentDidMount() {
    const run = setInterval(this.nextGen.bind(this), 100);
    this.props.saveInterval(run);
  }

  componentWillMount() {
    this.stop();
  }

  nextGen() {
    this.props.newGeneration();
  }

  clear() {
    const { cells, toggleCell } = this.props;

    cells.forEach((cell, i) => {
      if(cell.alive) {
        toggleCell(i);
      }
    });

    this.stop();
  }

  stop() {
    clearInterval(this.props.interval);
  }


  render() {
    const { board, cells } = this.props;

    return (
      <div>
        <Board
          width={board.width}
          height={board.height}
          cellWidth={board.cellWidth}
          cells={cells} />
        <button onClick={this.nextGen.bind(this)}>Step</button>
        <button onClick={this.clear.bind(this)}>Clear</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
      </div>
    );
  }

}

const mapStateToProps = ({ board, cells, interval }) => {
  return { board, cells, interval };
}

export default connect(mapStateToProps, {toggleCell, saveInterval, newGeneration})(Game);