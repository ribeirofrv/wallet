import React, { Component } from 'react';

class ExpenseTable extends Component {
  render() {
    return (
      <>
        <h1>Tabela de Gastos</h1>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </table>
      </>
    );
  }
}

export default ExpenseTable;
