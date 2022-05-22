export const ADD_EMAIL = 'ADD_EMAIL';

export function addEmailAction(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}
