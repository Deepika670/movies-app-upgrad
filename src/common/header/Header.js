import { Button } from '@material-ui/core';
import React, { Component } from 'react';

import logo from '../../assets/logo.svg';

import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      value: 0,
      registrationSuccessful: false,
      isLoggedIn:
        sessionStorage.getItem('access-token') === null ? false : true,
    };
  }

  onClickLoginButton = () => {
    alert('Login Modal');
    this.setState({
      showModal: true,
      value: 0,
    });
  };

  onClickLogoutButton = () => {
    alert('Logout Successful');
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <header className='header-container'>
        <img
          src={logo}
          alt='Movies App Logo'
          className='movies-app-logo'
        />
        {!this.state.isLoggedIn ? (
          <div className='login-logout-button'>
            <Button
              variant='contained'
              color='default'
              onClick={this.onClickLoginButton}
            >
              Login
            </Button>
          </div>
        ) : (
          <div className='login-logout-button'>
            <Button
              variant='contained'
              color='default'
              onClick={this.onClickLogoutButton}
            >
              Logout
            </Button>
          </div>
        )}
        <div className='book-show-button'>
          <Button
            variant='contained'
            color='primary'
          >
            Book Show
          </Button>
        </div>
      </header>
    );
  }
}

export default Header;
