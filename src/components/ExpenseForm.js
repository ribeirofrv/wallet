import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseForm extends Component {
  constructor() {
    super();
    // this.state = {
    //   value: 0,
    //   description: '',
    //   currency: '',
    //   method: '',
    //   tag: '',
    // };

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
    // console.log('addExpense');
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input data-testid="value-input" id="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input data-testid="description-input" id="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select id="currency-input">
            {currencies.map((codeCoin) => (
              <option key={ codeCoin } value={ codeCoin }>
                {codeCoin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Metodo de Pagamento
          <select data-testid="method-input" id="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select data-testid="tag-input" id="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit" onClick={ this.addExpense }>
          Adiciona despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(ExpenseForm);
