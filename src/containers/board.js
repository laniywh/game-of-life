import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell';
import { bindActionCreators } from 'redux';
import { toggleCell, createCells } from '../actions/index';

class Board extends Component {
  // componentWillMount() {
  //   const { width, height } = this.props;

  //   this.props.createCells(width, height);
  // }

  renderCells() {
    let cols = [];

    for(let i = 0; i < this.props.width; i++) {
      cols.push(this.renderCol(i));
    }

    return cols;
  }

  renderCol(j) {
    let cells = [];

    for (let i = 0; i < this.props.height; i++) {
      cells.push(this.renderCell(i, j));
    }

    return <div key={j}>{cells}</div>;
  }

  renderCell(i, j) {
    const { cells } = this.props;

    return (
      <Cell
        key={`${i}${j}`}
        // cells={this.props.cells}
        onCellClick={() => this.onCellClick(i, j)}
        alive={cells[i][j].alive}
        elemClass={cells[i][j].elemClass}
      />
    );
  }

  onCellClick(i, j) {
    this.props.toggleCell(i, j);
    // document.querySelector(`#cell-${i}-${j}`);
  }

  render() {
    return <div className="board">{this.renderCells()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    width: state.board.width,
    height: state.board.height,
    cells: state.cells,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleCell, createCells }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);