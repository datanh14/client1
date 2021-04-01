import { combineReducers } from 'redux';
import system, { systemState } from './system/systemReducer';

export interface AppState {
  system: systemState;
}

const rootReducer = combineReducers({
  system,
});

export default rootReducer;
