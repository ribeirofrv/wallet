import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrency } from '../actions';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends Component {
  constructor() {
    super();
    this.getTotalExpense = this.getTotalExpense.bind(this);
  }

  componentDidMount() {
    const { addCurrency } = this.props;
    addCurrency();
  }

  getTotalExpense() {
    const { expense } = this.props;
    const totalExpense = expense.reduce((total, expenses) => {
      const { value, currency } = expenses;
      const conversionRate = expenses.exchangeRates[currency].ask;
      return total + (value * conversionRate);
    }, 0);

    return totalExpense.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.getTotalExpense()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <main>
          <ExpenseForm />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrency: () => dispatch(getCurrency()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  addCurrency: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
