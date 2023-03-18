import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { Input } from '@material-ui/icons';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const TabContainer = function (props) {
  return (
    <Typography
      component='div'
      style={{ padding: 0, textAlign: 'center' }}
    >
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      tabValue: 0,
      usernameRequired: '',
      username: '',
      loginPassword: '',
      loginPasswordRequired: '',
      registrationSuccessful: false,
      isLoggedIn:
        sessionStorage.getItem('access-token') === null ? false : true,
    };
  }

  onClickLoginButton = () => {
    alert('Login Modal');
    this.setState({
      showModal: true,
      tabValue: 0,
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

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangeLoginPassword = (event) => {
    this.setState({
      loginPassword: event.target.value,
    });
  };

  onChangeTab = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleLogin = () => {
    this.state.username === ''
      ? this.setState({ usernameRequired: 'dispBlock' })
      : this.setState({ usernameRequired: 'dispNone' });

    this.state.loginPassword === ''
      ? this.setState({ loginPasswordRequired: 'dispBlock' })
      : this.setState({ loginPasswordRequired: 'dispNone' });

    let loginData = null;
    let xhrLogin = new XMLHttpRequest();
    let that = this;

    xhrLogin.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
        sessionStorage.setItem(
          'access-token',
          xhrLogin.getResponseHeader('access-token')
        );

        that.setState({
          isLoggedIn: true,
        });

        that.onCloseModal();
      }
    });

    xhrLogin.open('POST', this.props.baseUrl + 'auth/login');
    xhrLogin.setRequestHeader(
      'Authorization',
      'Basic ' +
        window.btoa(this.state.username + ':' + this.state.loginPassword)
    );
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
        {/* <Modal
          contentLabel='Login'
          style={modalStyles}
          onRequestClose={this.onCloseModal}
          isOpen={this.state.showModal}
          ariaHideApp={false}
        ></Modal> */}
        <Tabs
          className='tabs'
          value={this.state.tabValue}
          onChange={this.onChangeTab}
        >
          <Tab label='Login' />
          <Tab label='Register' />
        </Tabs>

        {this.state.value === 0 && (
          <TabContainer>
            <FormControl required>
              <InputLabel htnlFor='username'>Username</InputLabel>
              <Input
                id='username'
                type='text'
                username={this.state.username}
                onChange={this.onChangeUsername}
              />
              <FormHelperText className={this.state.usernameRequired}>
                <span className='red'>required</span>
              </FormHelperText>
            </FormControl>

            <br />
            <br />

            <FormControl required>
              <InputLabel htmlFor='loginPassword'>Password</InputLabel>
              <Input
                id='loginPassword'
                type='password'
                loginPassword={this.state.loginPassword}
                onChange={this.onChangeLoginPassword}
              />
              <FormHelperText className={this.state.loginPasswordRequired}>
                <span className='red'>required</span>
              </FormHelperText>
            </FormControl>

            <br />
            <br />

            {this.state.isLoggedIn === true && (
              <FormControl>
                <span className=''>Login Successful!</span>
              </FormControl>
            )}

            <br />
            <br />

            <Button
              variant='contained'
              color='primary'
              onClick={this.handleLogin}
            >
              LOGIN
            </Button>
          </TabContainer>
        )}
      </div>
    );
  }
}

export default Header;
