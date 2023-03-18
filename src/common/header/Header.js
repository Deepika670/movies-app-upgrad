import { Button, Modal } from '@material-ui/core';
import React, { Component } from 'react';

import logo from '../../assets/logo.svg';

import './Header.css';

const modalStyles = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      value: 0,
      usernameRequired: '',
      username: '',
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

  onClickBookShowButton = () => {
    alert('Book show button');
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
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
              onClick={this.onClickBookShowButton}
            >
              Book Show
            </Button>
          </div>
        </header>
        <Modal
          contentLable='Login'
          style={modalStyles}
          onRequestClose={this.onCloseModal}
          isOpen={this.state.showModal}
        >
          <div>Modal COntent</div>
        </Modal>
      </div>
    );
  }
}

export default Header;
