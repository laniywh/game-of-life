import { TOGGLE_CELL, CREATE_CELLS, NEW_GENERATION } from '../actions/index';
import { INITIAL_STATE } from './index';
import update from 'immutability-helper';


let width, height;

function newGeneration(state, action) {
  width = INITIAL_STATE.board.width;
  height = INITIAL_STATE.board.height;

  // const { board, cells } = this.props;

  const newCells = state.map((cell, i) => {
    const numOfNeighbors = getNumOfNeighbors(state, i);
    // console.log('i: ', i, numOfNeighbors);

    if(cell.alive) {
      // Die of inequilibrium
      if(!isEquilibrium(numOfNeighbors)) {
        // console.log('non equilibrium');
        // this.props.toggleCell(i);
        return { alive: false }
      }
      return cell;

    } else {
      if(canReproduce(numOfNeighbors)) {
        // this.props.toggleCell(i);
        return { alive: true }
      }
      return cell;
    }

  });


  // state.forEach((cell, i) => {
  //   const numOfNeighbors = this.getNumOfNeighbors(i);
  //   // console.log('i: ', i, numOfNeighbors);

  //   if(cell.alive) {
  //     // Die of inequilibrium
  //     if(!this.isEquilibrium(numOfNeighbors)) {
  //       // console.log('non equilibrium');
  //       this.props.toggleCell(i);
  //     }

  //   } else {
  //     if(this.canReproduce(numOfNeighbors)) {
  //       this.props.toggleCell(i);
  //     }
  //   }
  // });

  return newCells;
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




export default function(state = INITIAL_STATE.cells, action) {
  switch(action.type) {
    case NEW_GENERATION: return newGeneration(state, action);

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