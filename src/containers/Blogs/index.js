import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/Card';
import { fetchBlogRequest } from './store/actions';
import './styles.scss';

const Blogs = props => {
  const { blogs, blogIds, isLoading, getBlogs, total } = props;
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [searchText, setSearchText] = useState('');

  const maxPage = Math.ceil(total / limit);

  const paginates = [...Array(maxPage).keys()];

  const getBlogCallback = useCallback(
    query => {
      getBlogs(query);
    },
    [getBlogs]
  );

  useEffect(() => {
    const query = `?page=${page}&limit=${limit}`;
    getBlogCallback(query);
  }, [getBlogCallback, limit, page]);

  const onClickPaginate = item => () => {
    if (page !== item) {
      setPage(item);
    }
  };

  //handle filter search
  const ids = blogIds.filter(id => {
    const searchVal = searchText.trim();
    if (searchVal.length > 0) {
      const { content = '', title = '', createdAt = '' } = blogs[id] || {};
      return (
        (content !== null && content.includes(searchVal)) ||
        (title !== null && title.includes(searchVal)) ||
        (createdAt !== null && createdAt.includes(searchVal))
      );
    }
    return true;
  });

  const handleSearchBlog = e => {
    setSearchText(e.target.value);
  };

  const renderBlog = () => {
    return (
      <>
        {ids?.length < 1 ? (
          <div className="d-flex text-algin-center align-items-center justify-content-center p-5">
            No found data
          </div>
        ) : (
          <div className="flex-row flex-wrap p-5 content-blog">
            {ids?.map(blogId => (
              <Link to={`blog/${blogId}`} className="link" key={blogId}>
                <Card data={blogs[blogId]} />
              </Link>
            ))}
          </div>
        )}
        <nav className="d-flex align-items-center justify-content-center">
          <ul className="pagination">
            {paginates.map(item => (
              <li
                className={`page-item page-link link-paginate ${
                  item + 1 === page ? 'active' : ''
                }`}
                onClick={onClickPaginate(item + 1)}
                key={item}
              >
                {item + 1}
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  };

  return (
    <MainLayout>
      <form className="form-inline mt-5 ml-5 d-flex align-items-center justify-content-start">
        <div className="form-group">
          <label htmlFor="search" className="sr-only">
            Search Blog
          </label>
          <input
            type="search"
            className="form-control"
            id="search"
            placeholder="Search Blog"
            onChange={handleSearchBlog}
          />
        </div>
        <button type="submit" className="btn btn-primary ml-3">
          Search
        </button>
      </form>
      {isLoading ? (
        <div className="p-5 d-flex align-items-center justify-content-center">
          Loading....
        </div>
      ) : (
        renderBlog()
      )}
    </MainLayout>
  );
};

const mapStateToProps = store => {
  const { blogs, blogIds, isLoading, total } = store.blog;
  return { blogs, blogIds, isLoading, total };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBlogs: fetchBlogRequest,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
