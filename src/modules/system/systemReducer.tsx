import * as actions from '../../constants/actions';
import { some } from '../../constants/constants';

export interface systemState {
  readonly locale?: string;
  readonly profile?: some;
}

const initialState = {
  locale: 'vi',
  profile: {},
};

const system = (state: systemState = initialState, action: some) => {
  switch (action.type) {
    case actions.CHANGE_LANGUAGE:
      return { ...state, locale: action.payload };
    case actions.SHOW_LOADING:
      return { ...state, isLoading: true };
    case actions.HIDE_LOADING:
      return { ...state, isLoading: false };
    case actions.UPDATE_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default system;
