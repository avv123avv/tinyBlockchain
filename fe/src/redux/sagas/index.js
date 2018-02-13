import { put, fork, takeEvery, call } from 'redux-saga/effects';

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

export function * send(action) {
  try {
    const result = yield api().post('/txion', {
      ...action.nt
    });

    yield put(actions.sendNtSuccess({ nt: result.data }));
    yield call(balance);
    yield call(transactions);
  } catch (error) {
    console.error('sendTransaction error', error);
    yield put(actions.sendNtError(error));
    return error;
  }
}


export function * getBalance() {
  yield takeEvery(actions.GET_BALANCE, balance);
}
export function * getTransactions() {
  yield takeEvery(actions.GET_TRANSACTIONS, transactions);
}
export function * sendTransaction() {
  yield takeEvery(actions.SEND_NT, send);
}

export default function * root() {
  yield fork(getBalance);
  yield fork(getTransactions);
  yield fork(sendTransaction);
}
