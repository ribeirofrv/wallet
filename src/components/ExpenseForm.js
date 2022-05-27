import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExpense } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.addExpense = this.addExpense.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput({ target }) {
    const { id, value } = target;
    const stateName = id.replace(/-input/, '');
    this.setState({ [stateName]: value });
  }

  addExpense(event) {
    event.preventDefault();
    const { ...expenses } = this.state;
    const { addExpenseToStore } = this.props;
    addExpenseToStore(expenses);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            data-testid="value-input"
            id="value-input"
            value={ value }
            onChange={ this.onChangeInput }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            id="description-input"
            value={ description }
            onChange={ this.onChangeInput }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select id="currency-input" value={ currency } onChange={ this.onChangeInput }>
            {currencies.map((codeCoin) => (
              <option key={ codeCoin } value={ codeCoin }>
                {codeCoin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Metodo de Pagamento
          <select
            data-testid="method-input"
            id="method-input"
            value={ method }
            onChange={ this.onChangeInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            onChange={ this.onChangeInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit" onClick={ this.addExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseToStore: (localState) => dispatch(getExpense(localState)),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
