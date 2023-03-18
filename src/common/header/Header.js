import React, { Component } from 'react';

import logo from '../../assets/logo.svg';

import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='header-container'>
        <img
          src={logo}
          alt='Movies App Logo'
          className='movies-app-logo'
        />
      </div>
    );
  }
}

export default Header;
