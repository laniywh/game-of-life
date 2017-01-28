import { INITIAL_STATE } from './index';
import { INCREASE_GENERATION } from '../actions/index';
import { CLEAR_GENERATION } from '../actions/index';

export default function(state = INITIAL_STATE.generation, action) {
  switch(action.type) {
    case INCREASE_GENERATION:
      return state + 1;
    case CLEAR_GENERATION:
      return 0;
  }
  return state;
}