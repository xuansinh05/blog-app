import { types } from './constants';

export function fetchBlogRequest(query) {
  return {
    type: types.FETCH_BLOG_REQUEST,
    payload: { query },
  };
}

export function fetchBlogSuccess(data, totalPage) {
  return {
    type: types.FETCH_BLOG_SUCCESS,
    payload: { data, totalPage },
  };
}

export function fetchBlogFailure(error) {
  return {
    type: types.FETCH_BLOG_FAILURE,
    error,
  };
}

export function fetchBlogDetailRequest(query) {
  return {
    type: types.FETCH_BLOG_DETAIL_REQUEST,
    payload: { query },
  };
}

export function fetchBlogDetailSuccess(data) {
  return {
    type: types.FETCH_BLOG_DETAIL_SUCCESS,
    payload: { data },
  };
}

export function fetchBlogDetailFailure(error) {
  return {
    type: types.FETCH_BLOG_DETAIL_FAILURE,
    error,
  };
}
