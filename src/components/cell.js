import React, { Component } from 'react';
import classNames from 'classnames';

export default function({ onCellClick, alive, cellWidth }) {
  const style = {
    width: `${cellWidth}px`,
    height: `${cellWidth}px`,
  }

  return (
    <div
      className={classNames('cell', {alive})}
      onClick={onCellClick}
      style={style}>
    </div>
  );

}
