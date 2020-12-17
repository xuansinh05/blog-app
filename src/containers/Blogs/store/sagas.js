import { takeLatest, call, put } from 'redux-saga/effects';
import { getBlogs } from '../services';
import { types } from './constants';
import {
  fetchBlogDetailFailure,
  fetchBlogDetailSuccess,
  fetchBlogFailure,
  fetchBlogSuccess,
} from './actions';

function* getBlogsSaga(action) {
  try {
    const { data } = yield call(getBlogs, action.payload.query);
    //get total blog
    const response = yield call(getBlogs, '');
    const totalBlog = response.data.length;
    const blog = data.reduce(
      (obj, item) => {
        obj.blogs = { ...obj.blogs, [item.id]: item };
        obj.blogIds.push(item.id);
        return obj;
      },
      {
        blogs: {},
        blogIds: [],
      }
    );
    yield put(fetchBlogSuccess(blog, totalBlog));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { ...data.message },
    };
    yield put(fetchBlogFailure(payload));
  }
}

function* getBlogDetailSaga(action) {
  try {
    const { data } = yield call(getBlogs, action.payload.query);
    yield put(fetchBlogDetailSuccess(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { ...data.message },
    };
    yield put(fetchBlogDetailFailure(payload));
  }
}

export default function* blogsWatcher() {
  yield takeLatest(types.FETCH_BLOG_REQUEST, getBlogsSaga);
  yield takeLatest(types.FETCH_BLOG_DETAIL_REQUEST, getBlogDetailSaga);
}
