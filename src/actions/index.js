export const CREATE_CELLS = 'CREATE_CELLS';
export const TOGGLE_CELL = 'TOGGLE_CELL';

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
