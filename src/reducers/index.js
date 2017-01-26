import { combineReducers } from 'redux';
import BoardReducer from './reducer_board';
import CellsReducer from './reducer_cells';
import IntervalReducer from './reducer_interval';


const WIDTH = 50;
const HEIGHT = 30;
let cells = [];

// Generate 0 or 1
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

for(let i = 0; i < WIDTH * HEIGHT; i++) {
  cells[i] = {
    alive: getRandomInt(0, 2) ? true : false
  }
}

export const INITIAL_STATE = {
  board: {
    width: WIDTH,
    height: HEIGHT,
    cellWidth: 12
  },
  cells: cells,
  interval: null
}



const rootReducer = combineReducers({
  board: BoardReducer,
  cells: CellsReducer,
  interval: IntervalReducer,
});

export default rootReducer;
