import { TOGGLE_CELL, CREATE_CELLS } from '../actions/index';
import { INITIAL_STATE } from './index';



export default function(state = INITIAL_STATE.cells, action) {
  switch(action.type) {
    case TOGGLE_CELL:
    console.log('prev state:');
      console.log(state);
      const { i, j } = action.payload;
      // const newAlive = !state[i][j].alive;
      // console.log(state[i]);
      // const newCells = update(state, {i: {j: {alive: {$set: newAlive}}}});

      // let newCells = state;
      // const newAlive = !state[i][j].alive;
      // newCells[i][j].alive = !state[i][j].alive;
      // newCells[i][j].elemClass = 'cell alive';

      const { width, height } = INITIAL_STATE.board;
      let newCells = [];

      for (let i = 0; i < height; i++) {
        newCells[i] = new Array(width);
      }

      for(let r = 0; r < height; r++) {
        for(let s = 0; s < width; s++) {
          if(r == i && s == j) {
            newCells[r][s] = {
              alive: !state[i][j].alive
            }
          } else {
            newCells[r][s] = state[r][s];
          }
        }
      }


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