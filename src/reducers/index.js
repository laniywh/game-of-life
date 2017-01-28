import { combineReducers } from 'redux';
import BoardReducer from './reducer_board';
import CellsDataReducer from './reducer_cellsdata';
import IntervalReducer from './reducer_interval';
import SpeedReducer from './reducer_speed';
import GenerationReducer from './reducer_generation';

export const SLOW = 500;
export const MEDIUM = 300;
export const FAST = 100;

const WIDTH = 50;
const HEIGHT = 30;
let cells = [];
let lives = 0;

// Generate 0 or 1
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

for(let i = 0; i < WIDTH * HEIGHT; i++) {
  if(getRandomInt(0, 2)) {
    cells[i] = {alive: true};
    lives++;
  } else {
    cells[i] = {alive: false};
  }
}

export const INITIAL_STATE = {
  board: {
    width: WIDTH,
    height: HEIGHT,
    cellWidth: 12
  },
  cellsData: {
    cells: cells,
    lives: lives
  },
  interval: null,
  speed: FAST,
  generation: 0,
}

const rootReducer = combineReducers({
  board: BoardReducer,
  cellsData: CellsDataReducer,
  interval: IntervalReducer,
  speed: SpeedReducer,
  generation: GenerationReducer
});

export default rootReducer;
