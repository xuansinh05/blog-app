import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import logo from '../../../assets/images/logo-webpack.svg';

const links = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
  {
    label: 'Landings',
    link: '/',
  },
  {
    label: 'Docs',
    link: '/',
  },
  {
    label: 'Help',
    link: '/',
  },
];
function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex-row__center">
          <img src={logo} alt="logo" className="logo" />
          <span className="title-blog">FRONT-END DEVELOPER</span>
        </div>
        <ul className="link-container">
          {links.map((item, index) => (
            <Link
              to={item.link}
              title={item.label}
              className="link"
              key={index}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
