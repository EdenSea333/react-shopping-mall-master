import { UPDATE_SORT } from './actionTypes';

const initialState = {
  order: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SORT:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
