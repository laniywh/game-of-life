import { TOGGLE_CELL, CREATE_CELLS } from '../actions/index';
import { INITIAL_STATE } from './index';
import update from 'immutability-helper';



export default function(state = INITIAL_STATE.cells, action) {
  switch(action.type) {
    case TOGGLE_CELL:
      const i = action.payload;

      const newCells = state.map((cell, j) => {
        if(j == i) {
          return {
            alive: !state[i].alive
          }
        } else {
          return state[j];
        }
      })

      // console.log('newCells:');
      // console.log(newCells);
      return newCells;

    case CREATE_CELLS:
      let cells = [];
      const { newWidth, newHeight } = action.payload;


      // Create empty arrays
      for (let i = 0; i < newHeight; i++) {
        cells[i] = new Array(newWidth);
      }

      // Fill each slot with a cell
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          cells[i][j] = {
            alive: false,
          }
        }
      }
      return cells;
  }
  return state;
}