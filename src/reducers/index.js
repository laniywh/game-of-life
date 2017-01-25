import { combineReducers } from 'redux';
import BoardReducer from './reducer_board';
import CellsReducer from './reducer_cells';


const WIDTH = 10;
const HEIGHT = 5;
let cells = [];

for(let i = 0; i < WIDTH * HEIGHT; i++) {
  cells[i] = {
    alive: false,
  }
}

export const INITIAL_STATE = {
  board: {
    width: 10,
    height: 5,
    cellWidth: 12
  },
  cells: cells,
}

const rootReducer = combineReducers({
  board: BoardReducer,
  cells: CellsReducer
});

export default rootReducer;
