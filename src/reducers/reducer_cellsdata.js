import { TOGGLE_CELL, CREATE_CELLS, NEW_GENERATION } from '../actions/index';
import { INITIAL_STATE } from './index';
import update from 'immutability-helper';


let width, height;

function newGeneration(state, action) {
  width = INITIAL_STATE.board.width;
  height = INITIAL_STATE.board.height;

  const cells = state.cells;
  let newLives = state.lives;

  const newCells = cells.map((cell, i) => {
    const numOfNeighbors = getNumOfNeighbors(cells, i);

    if(cell.alive) {
      // Die of inequilibrium
      if(!isEquilibrium(numOfNeighbors)) {
        newLives--;
        return { alive: false }
      }
      return cell;

    } else {
      if(canReproduce(numOfNeighbors)) {
        newLives++;
        return { alive: true }
      }
      return cell;
    }

  });


  return {
    cells: newCells,
    lives: newLives
  };
}


function canReproduce(numOfNeighbors) {
  return numOfNeighbors == 3;
}

function isEquilibrium(numOfNeighbors) {
  return numOfNeighbors == 2 || numOfNeighbors == 3
}

function getNumOfNeighbors(cells, i) {
  let total = 0;

  if(cells[top(i)].alive) total++;
  if(cells[right(i)].alive) total++;
  if(cells[bottom(i)].alive) total++;
  if(cells[left(i)].alive) total++;

  if(cells[top(left(i))].alive) total++;
  if(cells[top(right(i))].alive) total++;
  if(cells[bottom(left(i))].alive) total++;
  if(cells[bottom(right(i))].alive) total++;

  return total;
}

function top(i) {
  return i - width >= 0 ? (i - width) : (i + width * (height - 1));
}

function bottom(i) {
  return i + width < width * height ? (i + width) : (i - width * (height - 1));
}

function left(i) {
  return i % width != 0 ? (i - 1) : (i + width - 1);
}

function right(i) {
  return (i + 1) % width != 0 ? (i + 1) : (i - width + 1);
}


function toggleCell(state, action) {
  const i = action.payload;
  const cells = state.cells;
  let newLives = state.lives;

  const newCells = cells.map((cell, j) => {
    if(j == i) {
      cells[i].alive ? newLives-- : newLives++;
      return {
        alive: !cells[i].alive
      }
    } else {
      return cells[j];
    }
  })

  return {
    cells: newCells,
    lives: newLives
  };
}


export default function(state = INITIAL_STATE.cellsData, action) {
  switch(action.type) {
    case NEW_GENERATION: return newGeneration(state, action);
    case TOGGLE_CELL: return toggleCell(state, action);
    default: return state;
  }
}