import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HelmetComponent from '../../components/HelmetComponent';

function MainLayout(props) {
  return (
    <React.Fragment>
      <HelmetComponent title="Blog App" />
      <Header />
      <div className="py-5">{props.children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default MainLayout;
