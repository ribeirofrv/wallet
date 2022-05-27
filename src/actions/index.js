export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addEmailAction = (email) => ({ type: ADD_EMAIL, payload: email });

const addCurrencyAction = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

const addExpenseAction = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const getCurrency = () => async (dispatch) => {
  const apiData = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await apiData.json();

  delete currencies.USDT;
  const currenciesKeys = Object.keys(currencies);

  dispatch(addCurrencyAction(currenciesKeys));
};

export const getExpense = (localState) => async (dispatch) => {
  const apiData = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await apiData.json();

  delete currencies.USDT;
  const expense = { localState, currencies };

  dispatch(addExpenseAction(expense));
};
