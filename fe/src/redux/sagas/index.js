import { put, fork, takeEvery } from 'redux-saga/effects';

import api from 'api';

import * as actions from 'redux/actions/walletActions';

export function * balance() {
  try {
    const result = yield api().get('/balance');

    yield put(actions.getBalanceSuccess({ balance: result.data }));
  } catch (error) {
    console.error('getBalance error', error);
    yield put(actions.getBalanceError(error));
    return error;
  }
}

export function * transactions() {
  try {
    const result = yield api().get('/transactions');

    console.log('transactions', result);

    yield put(actions.getTransactionsSuccess({ transactions: result.data }));
  } catch (error) {
    console.error('getTransactions error', error);
    yield put(actions.getTransactionsError(error));
    return error;
  }
}


export function * getBalance() {
  yield takeEvery(actions.GET_BALANCE, balance);
}
export function * getTransactions() {
  yield takeEvery(actions.GET_TRANSACTIONS, transactions);
}

export default function * root() {
  yield fork(getBalance);
  yield fork(getTransactions);
}
