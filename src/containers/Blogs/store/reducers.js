import produce from 'immer';
import { types } from './constants';

//initial state of the blog page
export const initialState = {
  blogs: {},
  blogIds: [],
  blogDetails: {},
  error: {},
  total: 0,
  isLoading: true,
};

const blogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FETCH_BLOG_REQUEST:
      case types.FETCH_BLOG_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case types.FETCH_BLOG_SUCCESS:
        draft.blogIds = action.payload.data.blogIds;
        draft.blogs = action.payload.data.blogs;
        draft.total = action.payload.totalPage;
        draft.isLoading = false;
        break;
      case types.FETCH_BLOG_DETAIL_SUCCESS:
        draft.blogDetails = action.payload.data;
        draft.isLoading = false;
        break;
      case types.FETCH_BLOG_FAILURE:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default blogReducer;
