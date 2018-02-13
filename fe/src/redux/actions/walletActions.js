export const GET_BALANCE = 'GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_ERROR = 'GET_BALANCE_ERROR';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';

export const SEND_NT = 'SEND_NT';
export const SEND_NT_SUCCESS = 'SEND_NT_SUCCESS';
export const SEND_NT_ERROR = 'SEND_NT_ERROR';

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

export function sendNt({ nt }) {
  return {
    type: SEND_NT,
    nt
  };
}

export function sendNtSuccess({ nt }) {
  return {
    type: SEND_NT_SUCCESS,
    nt
  };
}

export function sendNtError({ error }) {
  return {
    type: SEND_NT_ERROR,
    error
  };
}

