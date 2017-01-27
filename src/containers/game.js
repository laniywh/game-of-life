import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Board from './board';
import Stats from '../components/stats';
import { toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed, increaseGeneration } from '../actions/index';
import { SLOW, MEDIUM, FAST } from '../reducers/index';

class Game extends Component {
  componentDidMount() {
    // const run = setInterval(this.nextGen.bind(this), 100);
    // this.props.saveInterval(run);
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
    const { cellsData, toggleCell } = this.props;

    cellsData.cells.forEach((cell, i) => {
      if(cell.alive) {
        toggleCell(i);
      }
    });

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
        <div>
          <button onClick={this.start.bind(this)}>Start</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <button onClick={this.nextGen.bind(this)}>Step</button>
          <button onClick={this.clear.bind(this)}>Clear</button>

          <Board
            width={board.width}
            height={board.height}
            cellWidth={board.cellWidth}
            cells={cellsData.cells} />

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
        <div>
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
  return bindActionCreators({toggleCell, setupInterval, stopRunning, newGeneration, changeSpeed, increaseGeneration}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);