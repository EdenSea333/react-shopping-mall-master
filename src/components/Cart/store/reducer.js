import * as actionTypes from './actionTypes';

const initialState = {
  products: [],
  productToAdd: {},
  productToRemove: {},
  productToChange: {},
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CART:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload),
      };
    case actionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload),
      };
    case actionTypes.CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        productToChange: Object.assign({}, action.payload),
      };
    case actionTypes.UPDATE_CART_TOTAL:
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };
    default:
      return state;
  }
};
