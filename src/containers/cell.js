import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { toggleCell } from '../actions/index';
import classNames from 'classnames';

export default function({ elemClass, onCellClick, alive }) {

  return (
    <div
      className={classNames('cell', {alive})}
      // id={`cell-${i}-${j}`}
      onClick={onCellClick}>
    </div>
  );

}
