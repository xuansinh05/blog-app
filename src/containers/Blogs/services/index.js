import axiosClient from '../../../utils/axios';

export const getBlogs = async query => {
  return await axiosClient.get(`/blogs${query}`);
};
