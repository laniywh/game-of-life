import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Board from './board';
import { toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed } from '../actions/index';
import { SLOW, MEDIUM, FAST } from '../reducers/index';

class Game extends Component {
  componentDidMount() {
    // const run = setInterval(this.nextGen.bind(this), 100);
    // this.props.saveInterval(run);
    this.start(this.props.speed);
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

  start(speed) {
    clearInterval(this.props.interval);

    const run = setInterval(this.nextGen.bind(this), speed);
    this.props.setupInterval(run);
  }

  stop() {
    clearInterval(this.props.interval);
    this.props.stopRunning();
  }

  onSpeedClick(speed) {
    this.start(speed);
    this.props.changeSpeed(speed);
  }


  render() {
    const { board, cells, speed } = this.props;

    return (
      <div>
        <button onClick={this.start.bind(this)}>Start</button>
        <button onClick={this.nextGen.bind(this)}>Step</button>
        <button onClick={this.clear.bind(this)}>Clear</button>
        <button onClick={this.stop.bind(this)}>Stop</button>

        <Board
          width={board.width}
          height={board.height}
          cellWidth={board.cellWidth}
          cells={cells} />

        <span>Sim Speed:</span>
        <button
          className={classNames({active: speed == SLOW})}
          onClick={() => this.onSpeedClick(SLOW)}>
          Slow
        </button>
        <button
          className={classNames({active: speed == MEDIUM})}
          onClick={() => this.onSpeedClick(MEDIUM)}>
          Medium
        </button>
        <button
          className={classNames({active: speed == FAST})}
          onClick={() => this.onSpeedClick(FAST)}>
          Fast
        </button>

      </div>
    );
  }

}

const mapStateToProps = ({ board, cells, interval, speed }) => {
  return { board, cells, interval, speed };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);