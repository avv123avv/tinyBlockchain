import {
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_ERROR,

  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,

  SEND_NT,
  SEND_NT_SUCCESS,
  SEND_NT_ERROR
} from 'redux/actions/walletActions';

const initialState = {
  balance: 0,
  transactions: [],

  loadingBalance: true,
  loadingTransactions: true,
  loadingSend: false,

  error: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        loadingBalance: true,
        error: {}
      };
    case GET_BALANCE_SUCCESS:
      return {
        ...state,
        loadingBalance: false,
        balance: action.balance,
        error: {}
      };
    case GET_BALANCE_ERROR:
      return {
        ...state,
        loadingBalance: false,
        error: action.error
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        loadingTransactions: true,
        error: {}
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loadingTransactions: false,
        transactions: action.transactions,
        error: {}
      };
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        loadingTransactions: false,
        error: action.error
      };
    case SEND_NT:
      return {
        ...state,
        loadingSend: true,
        error: {}
      };
    case SEND_NT_SUCCESS:
      return {
        ...state,
        loadingSend: false,
        nt: action.nt,
        error: {}
      };
    case SEND_NT_ERROR:
      return {
        ...state,
        loadingSend: false,
        error: action.error
      };
    default:
      return state;
  }
}
