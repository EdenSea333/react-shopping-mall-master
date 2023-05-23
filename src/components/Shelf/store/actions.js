import { productsAPI } from '../../../utils';
import axios from 'axios';
import store from '../../../store';
import { FETCH_PRODUCTS } from './actionTypes';

function constructAPI(filters, sort) {
  const sortOrders = {
    lowestprice: 'lowestprice',
    highestprice: 'highestprice',
  };

  let api = productsAPI;

  const params = [];

  if (filters.length || sort) {
    api += '?';
  }

  if (filters.length) {
    filters.forEach((filter) => {
      params.push(`size=${filter}`);
    });
  }

  if (sort) {
    params.push('_sort=price');
    params.push('_order=' + (sort === sortOrders.lowestprice ? 'asc' : 'desc'));
  }

  return api + params.join('&');
}

export const fetchProducts = () => (dispatch) => {
  const filters = store.getState().filters.sizes;
  const sort = store.getState().sort.order;

  const fetchAPI = constructAPI(filters, sort);

  axios
    .get(fetchAPI)
    .then((res) => {
      let products = res.data;

      dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    })
    .catch((err) => {
      console.error('Could not fetch products. Try again later.', err);
    });
};
