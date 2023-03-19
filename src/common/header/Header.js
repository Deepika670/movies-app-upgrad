import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Tabs from '@material-ui/core/Tabs';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';

import './Header.css';

const modalStyles = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
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

      username: '',
      usernameRequired: 'hide',

      loginPassword: '',
      loginPasswordRequired: 'hide',

      firstname: '',
      firstnameRequired: 'hide',

      lastname: '',
      lastnameRequired: 'hide',

      email: '',
      emailRequired: 'hide',

      registerPassword: '',
      registerPasswordRequired: 'hide',

      contact: '',
      contactRequired: 'hide',

      registrationSuccess: false,

      isLoggedIn: sessionStorage.getItem('access-token') == null ? false : true,
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true,

      tabValue: 0,

      username: '',
      usernameRequired: 'hide',

      loginPassword: '',
      loginPasswordRequired: 'hide',

      firstname: '',
      firstnameRequired: 'hide',

      lastname: '',
      lastnameRequired: 'hide',

      email: '',
      emailRequired: 'hide',

      registerPassword: '',
      registerPasswordRequired: 'hide',

      contact: '',
      contactRequired: 'hide',
    });
  };

  closeModalHandler = () => {
    this.setState({ showModal: false });
  };

  tabChangeHandler = (event, tabValue) => {
    this.setState({ tabValue });
  };

  loginClickHandler = () => {
    this.state.username === ''
      ? this.setState({ usernameRequired: 'show' })
      : this.setState({ usernameRequired: 'hide' });

    this.state.loginPassword === ''
      ? this.setState({ loginPasswordRequired: 'show' })
      : this.setState({ loginPasswordRequired: 'hide' });

    let loginData = null;
    let xhrLogin = new XMLHttpRequest();
    let currentState = this;

    xhrLogin.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
        sessionStorage.setItem(
          'access-token',
          xhrLogin.getResponseHeader('access-token')
        );

        currentState.setState({
          isLoggedIn: true,
        });

        currentState.closeModalHandler();
      }
    });

    xhrLogin.open('POST', this.props.baseUrl + 'auth/login');
    xhrLogin.setRequestHeader(
      'Authorization',
      'Basic ' +
        window.btoa(this.state.username + ':' + this.state.loginPassword)
    );

    xhrLogin.setRequestHeader('Content-Type', 'application/json');
    xhrLogin.setRequestHeader('Cache-Control', 'no-cache');

    xhrLogin.send(loginData);
  };

  inputUsernameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  inputLoginPasswordChangeHandler = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  onClickRegisterButton = () => {
    this.state.firstname === ''
      ? this.setState({ firstnameRequired: 'show' })
      : this.setState({ firstnameRequired: 'hide' });

    this.state.lastname === ''
      ? this.setState({ lastnameRequired: 'show' })
      : this.setState({ lastnameRequired: 'hide' });

    this.state.email === ''
      ? this.setState({ emailRequired: 'show' })
      : this.setState({ emailRequired: 'hide' });

    this.state.registerPassword === ''
      ? this.setState({ registerPasswordRequired: 'show' })
      : this.setState({ registerPasswordRequired: 'hide' });

    this.state.contact === ''
      ? this.setState({ contactRequired: 'show' })
      : this.setState({ contactRequired: 'hide' });

    let userRegistrationData = JSON.stringify({
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email_address: this.state.email,
      password: this.state.registerPassword,
      mobile_number: this.state.contact,
    });

    let xhrSignup = new XMLHttpRequest();
    let currentState = this;

    xhrSignup.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        currentState.setState({
          registrationSuccess: true,
        });
      }
    });

    xhrSignup.open('POST', this.props.baseUrl + 'signup');

    xhrSignup.setRequestHeader('Content-Type', 'application/json');
    xhrSignup.setRequestHeader('Cache-Control', 'no-cache');

    xhrSignup.send(userRegistrationData);
  };

  onChangeFirstName = (event) => {
    this.setState({ firstname: event.target.value });
  };

  onChangeLastName = (event) => {
    this.setState({ lastname: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeRegisterPassword = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onChangeContact = (event) => {
    this.setState({ contact: event.target.value });
  };

  onClickLogout = (event) => {
    sessionStorage.removeItem('uuid');
    sessionStorage.removeItem('access-token');

    this.setState({
      isLoggedIn: false,
    });
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
                onClick={this.handleOpenModal}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className='login-logout-button'>
              <Button
                variant='contained'
                color='default'
                onClick={this.onClickLogout}
              >
                Logout
              </Button>
            </div>
          )}
          {this.props.showBookShowButton === 'true' &&
          !this.state.isLoggedIn ? (
            <div className='book-show-button'>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleOpenModal}
              >
                Book Show
              </Button>
            </div>
          ) : (
            ''
          )}

          {this.props.showBookShowButton === 'true' && this.state.isLoggedIn ? (
            <div className='bookshow-button'>
              <Link to={'/bookshow/' + this.props.id}>
                <Button
                  variant='contained'
                  color='primary'
                >
                  Book Show
                </Button>
              </Link>
            </div>
          ) : (
            ''
          )}
        </header>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModalHandler}
          contentLabel='Login'
          style={modalStyles}
          ariaHideApp={false}
        >
          <Tabs
            className='tabs-container'
            value={this.state.tabValue}
            onChange={this.tabChangeHandler}
          >
            <Tab label='Login' />
            <Tab label='Register' />
          </Tabs>

          {this.state.tabValue === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input
                  id='username'
                  type='text'
                  username={this.state.username}
                  onChange={this.inputUsernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor='loginPassword'>Password</InputLabel>
                <Input
                  id='loginPassword'
                  type='password'
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {this.state.isLoggedIn === true && (
                <FormControl>
                  <span className='success-toast-message'>
                    Login Successful!
                  </span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant='contained'
                color='primary'
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}

          {this.state.tabValue === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor='firstname'>First Name</InputLabel>
                <Input
                  id='firstname'
                  type='text'
                  firstname={this.state.firstname}
                  onChange={this.onChangeFirstName}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor='lastname'>Last Name</InputLabel>
                <Input
                  id='lastname'
                  type='text'
                  lastname={this.state.lastname}
                  onChange={this.onChangeLastName}
                />
                <FormHelperText className={this.state.lastnameRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input
                  id='email'
                  type='text'
                  email={this.state.email}
                  onChange={this.onChangeEmail}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor='registerPassword'>Password</InputLabel>
                <Input
                  id='registerPassword'
                  type='password'
                  registerpassword={this.state.registerPassword}
                  onChange={this.onChangeRegisterPassword}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor='contact'>Contact No.</InputLabel>
                <Input
                  id='contact'
                  type='text'
                  contact={this.state.contact}
                  onChange={this.onChangeContact}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <span className='error-message'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />

              {this.state.registrationSuccess === true && (
                <FormControl>
                  <span className='success-toast-message'>
                    Registration Successful. Please Login!
                  </span>
                </FormControl>
              )}

              <br />
              <br />
              <Button
                variant='contained'
                color='primary'
                onClick={this.onClickRegisterButton}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;
