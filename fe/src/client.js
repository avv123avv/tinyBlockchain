import React      from 'react';
import ReactDOM   from 'react-dom';

// import routes libraries
import { browserHistory, Router } from 'react-router';
import rootSaga from './redux/sagas';
import routes from './routes';

// connect Redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

store.runSaga(rootSaga);

const component = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

console.log('render');
ReactDOM.render(component, document.getElementById('react-view'));
