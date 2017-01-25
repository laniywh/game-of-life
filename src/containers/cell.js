import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { toggleCell } from '../actions/index';
import classNames from 'classnames';

export default function({ onCellClick, alive, cellWidth }) {
  const style = {
    width: `${cellWidth}px`,
    height: `${cellWidth}px`,
  }

  return (
    <div
      className={classNames('cell', {alive})}
      // id={`cell-${i}-${j}`}
      onClick={onCellClick}
      style={style}>
    </div>
  );

}
