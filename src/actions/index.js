export const CREATE_CELLS = 'CREATE_CELLS';
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const SAVE_INTERVAL = 'SAVE_INTERVAL';
export const NEW_GENERATION = 'NEW_GENERATION';

export function createCells(width, height) {
  return {
    type: CREATE_CELLS,
    payload: {newWidth, newHeight}
  }
}

export function toggleCell(i) {
  return {
    type: TOGGLE_CELL,
    payload: i
  }
}

export function saveInterval(interval) {
  return {
    type: SAVE_INTERVAL,
    payload: interval
  }
}

export function newGeneration() {
  return {
    type: NEW_GENERATION,
    paylaod: null
  }
}
