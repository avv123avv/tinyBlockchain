export const GET_BALANCE = 'GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_ERROR = 'GET_BALANCE_ERROR';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';

export function getBalance() {
  return {
    type: GET_BALANCE
  };
}

export function getBalanceSuccess({ balance }) {
  return {
    type: GET_BALANCE_SUCCESS,
    balance
  };
}

export function getBalanceError({ error }) {
  return {
    type: GET_BALANCE_ERROR,
    error
  };
}

export function getTransactions() {
  return {
    type: GET_TRANSACTIONS
  };
}

export function getTransactionsSuccess({ transactions }) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    transactions
  };
}

export function getTransactionsError({ error }) {
  return {
    type: GET_TRANSACTIONS_ERROR,
    error
  };
}

