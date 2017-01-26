export const CREATE_CELLS = 'CREATE_CELLS';
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const NEW_GENERATION = 'NEW_GENERATION';
export const SETUP_INTERVAL = 'SETUP_INTERVAL';
export const STOP_RUNNING = 'STOP_RUNNING';
export const CHANGE_SPEED = 'CHANGE_SPEED';


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

export function setupInterval(interval) {
  return {
    type: SETUP_INTERVAL,
    payload: interval
  }
}

export function stopRunning() {
  return {
    type: STOP_RUNNING,
    payload: null
  }
}

export function newGeneration() {
  return {
    type: NEW_GENERATION,
    payload: null
  }
}

export function changeSpeed(speed) {
  return {
    type: CHANGE_SPEED,
    payload: speed
  }
}