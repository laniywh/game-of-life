import { INITIAL_STATE } from './index';
import { CHANGE_SPEED } from '../actions/index';

export default function(state = INITIAL_STATE.speed, action) {
  switch(action.type) {
    case CHANGE_SPEED:
      return action.payload;
  }
  return state;
}