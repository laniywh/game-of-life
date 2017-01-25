import { combineReducers } from 'redux';
import BoardReducer from './reducer_board';
import CellsReducer from './reducer_cells';


const WIDTH = 10;
const HEIGHT = 5;
let cells = [];

// Create an array of cells
for (let i = 0; i < HEIGHT; i++) {
  cells[i] = new Array(WIDTH);
}
for (let i = 0; i < cells.length; i++) {
  for (let j = 0; j < cells[i].length; j++) {
    cells[i][j] = {
      alive: false
    }
  }
}

export const INITIAL_STATE = {
  board: {
    width: 10,
    height: 5
  },
  cells: cells,
}

const rootReducer = combineReducers({
  board: BoardReducer,
  cells: CellsReducer
});

export default rootReducer;
