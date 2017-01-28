import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Board from './board';
import Stats from '../components/stats';
import { toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed, increaseGeneration, clearGeneration } from '../actions/index';
import { SLOW, MEDIUM, FAST } from '../reducers/index';

class Game extends Component {
  componentDidMount() {
    this.start(this.props.speed);
  }

  componentWillMount() {
    this.pause();
  }

  nextGen() {
    this.props.newGeneration();
    this.props.increaseGeneration();
  }

  clear() {
    const { cellsData, toggleCell, clearGeneration } = this.props;

    cellsData.cells.forEach((cell, i) => {
      if(cell.alive) {
        toggleCell(i);
      }
    });

    clearGeneration();
    this.pause();
  }

  start(speed) {
    clearInterval(this.props.interval);

    const run = setInterval(this.nextGen.bind(this), speed);
    this.props.setupInterval(run);
  }

  pause() {
    clearInterval(this.props.interval);
    this.props.stopRunning();
  }

  onSpeedClick(speed) {
    this.start(speed);
    this.props.changeSpeed(speed);
  }


  render() {
    const { board, cellsData, speed, generation } = this.props;

    return (
      <div className="flex flex-row">
        <div className="flex-item">
          <button onClick={() => this.start(speed).bind(this)}>Start</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <button onClick={this.nextGen.bind(this)}>Step</button>
          <button className="button-danger" onClick={this.clear.bind(this)}>Clear</button>

          <Board
            className="board"
            width={board.width}
            height={board.height}
            cellWidth={board.cellWidth}
            cells={cellsData.cells} />

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
        <div className="flex-item stats">
          <Stats generation={generation} lives={cellsData.lives}/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ board, cellsData, interval, speed, generation }) => {
  return { board, cellsData, interval, speed, generation };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed, increaseGeneration, clearGeneration}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);