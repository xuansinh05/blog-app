import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BlogDetails from '../containers/Blogs/BlogDetails';
import { BlogPage } from '../pages';

// i can create array routes contain prop for a route, but this is simple app so i wasn't used.
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Switch>
      {/* <Redirect exact to="/" component={BlogPage} /> */}
      <Route exact path="/" component={BlogPage} />
      <Route exact path="/blog" component={BlogPage} />
      <Route exact path="/blog/:id" component={BlogDetails} />
    </Switch>
  );
};
