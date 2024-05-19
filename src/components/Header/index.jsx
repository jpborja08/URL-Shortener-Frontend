import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@constants/routes';
import './styles.scss';

const Header = () => (
  <header>
    <Link className="home-link" to={routes.HOME}>URL Shortener</Link>
  </header>
);

export default Header;
