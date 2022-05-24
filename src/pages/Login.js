import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmailAction } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = { emailInput: '', passwordInput: '' };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.loginButtonEvent = this.loginButtonEvent.bind(this);
    this.isLoginButtonDisabled = this.isLoginButtonDisabled.bind(this);
  }

  onChangeInput({ target }) {
    const { id, value } = target;
    const stateName = id.replace(/-input/, 'Input');
    this.setState({ [stateName]: value });
  }

  loginButtonEvent() {
    const { history, addEmail } = this.props;
    const { emailInput } = this.state;

    addEmail(emailInput);
    history.push('/carteira');
  }

  isLoginButtonDisabled() {
    const { emailInput, passwordInput } = this.state;
    // regex code ref.: https://www.codegrepper.com/code-examples/javascript/email+validation+react
    const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/;
    const isValid = pattern.test(emailInput);
    const minimumCharacters = 6;

    if (passwordInput.length >= minimumCharacters && isValid === true) return false;

    return true;
  }

  render() {
    return (
      <div className="page-login">
        <header>
          <h2>Login</h2>
        </header>
        <section>
          <form>
            <label htmlFor="email-input">
              <span>Email</span>
              <input
                id="email-input"
                type="email"
                onChange={ this.onChangeInput }
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password-input">
              <span>Senha</span>
              <input
                id="password-input"
                type="password"
                onChange={ this.onChangeInput }
                data-testid="password-input"
              />
            </label>
            <button
              data-testid="submit-button"
              type="submit"
              onClick={ this.loginButtonEvent }
              disabled={ this.isLoginButtonDisabled() }
            >
              Entrar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  addEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => {
    dispatch(addEmailAction(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);
