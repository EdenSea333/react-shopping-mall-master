import { UPDATE_FILTER } from './actionTypes';

const initialState = {
  sizes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        sizes: action.payload,
      };
    default:
      return state;
  }
};
