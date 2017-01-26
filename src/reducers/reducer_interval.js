import { INITIAL_STATE } from './index';
import { SAVE_INTERVAL } from '../actions/index';

export default function(state = INITIAL_STATE.interval, action) {
  switch(action.type) {
    case SAVE_INTERVAL:
      return action.payload;
  }
  return state;
}