import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import { fetchBlogDetailRequest } from '../store/actions';

import MainLayout from '../../../layouts/MainLayout';

import './styles.scss';

function BlogDetails(props) {
  const { getBlogDetail, blogDetails, isLoading } = props;
  const match = useRouteMatch();
  const blogId = match.params.id;

  useEffect(() => {
    getBlogDetail(`/${blogId}`);
  }, [blogId, getBlogDetail]);
  console.log('blogDetails', isLoading);

  const renderBlogDetails = () => {
    return (
      <div className="section-blog">
        <div className="blog-title pb-5">Welcome to Blog Details</div>
        <div className="blog-content d-flex flex-row">
          <div
            className="image"
            style={{ backgroundImage: `url(${blogDetails.image})` }}
          />
          <div className="d-flex flex-column ml-4">
            <span className="text">Title Blog: {blogDetails.title}</span>
            <span className="text">Content: {blogDetails.content}</span>
            <span className="text">
              Created At: {moment(blogDetails.createdAt).format('LLL')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    // You can custom loading with animation or skeleton, progress...
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        Loading .....
      </div>
    );
  };

  return (
    <MainLayout>{isLoading ? renderLoading() : renderBlogDetails()}</MainLayout>
  );
}

const mapStateToProps = store => {
  const { blogDetails, isLoading } = store.blog;
  return { blogDetails, isLoading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBlogDetail: fetchBlogDetailRequest,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
