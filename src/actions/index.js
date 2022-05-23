export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmailAction = (email) => ({ type: ADD_EMAIL, payload: email });

const addCurrencyAction = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const getCurrency = () => async (dispatch) => {
  const apiData = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await apiData.json();

  delete currencies.USDT;
  const currenciesKeys = Object.keys(currencies);

  dispatch(addCurrencyAction(currenciesKeys));
};
