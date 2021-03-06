import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from '../components/cell';
import { bindActionCreators } from 'redux';
import { toggleCell, createCells } from '../actions/index';

class Board extends Component {

  renderCells() {
    const { cellWidth, cells } = this.props;

    return cells.map((cell, i) => {
      return (
        <Cell
          key={`${i}`}
          onCellClick={() => this.onCellClick(i)}
          alive={cells[i].alive}
          cellWidth={cellWidth} />
      );
    });

  }

  onCellClick(i) {
    this.props.toggleCell(i);
  }

  render() {
    const { width, height, cellWidth } = this.props;

    const boardWidth = cellWidth * width + width;
    const style = {
      width: `${boardWidth}px`
    };

    return (
      <div
        className="board"
        style={style}>
        {this.renderCells()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleCell, createCells }, dispatch);
}

export default connect(null, mapDispatchToProps)(Board);