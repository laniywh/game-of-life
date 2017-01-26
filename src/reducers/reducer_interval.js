import { INITIAL_STATE } from './index';
import { SAVE_INTERVAL, SETUP_INTERVAL } from '../actions/index';

export default function(state = INITIAL_STATE.interval, action) {
  switch(action.type) {
    case SETUP_INTERVAL:
      return action.payload;
  }
  return state;
}