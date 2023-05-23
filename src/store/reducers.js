import { combineReducers } from 'redux';
import { reducer as shelfReducer } from '../components/Shelf/store';
import { reducer as cartReducer } from '../components/Cart/store';
import { reducer as filtersReducer } from '../components/Shelf/Filter/store';
import { reducer as sortReducer } from '../components/Shelf/Sort/store';

export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  filters: filtersReducer,
  sort: sortReducer,
});
