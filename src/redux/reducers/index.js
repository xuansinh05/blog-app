import { combineReducers } from 'redux';
import blogReducer from '../../containers/Blogs/store/reducers';
export const rootReducer = combineReducers({
  blog: blogReducer,
});
