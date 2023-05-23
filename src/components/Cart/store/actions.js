import * as actionTypes from './actionTypes';

export const loadCart = (products) => ({
  type: actionTypes.LOAD_CART,
  payload: products,
});

export const addProduct = (product) => ({
  type: actionTypes.ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (product) => ({
  type: actionTypes.REMOVE_PRODUCT,
  payload: product,
});

export const changeProductQuantity = (product) => ({
  type: actionTypes.CHANGE_PRODUCT_QUANTITY,
  payload: product,
});

export const updateCartTotal = (cartProducts) => (dispatch) => {
  let totalPrice = cartProducts.reduce((sum, p) => {
    sum += p.price * p.quantity;
    return sum;
  }, 0);

  let cartTotal = {
    totalPrice,
  };

  dispatch({
    type: actionTypes.UPDATE_CART_TOTAL,
    payload: cartTotal,
  });
};
