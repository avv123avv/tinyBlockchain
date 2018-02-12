import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

import Paper from 'material-ui/Paper';

import * as actions from 'redux/actions/walletActions';

import styles from './styles';
import theme from './theme';

class MainComponent extends Component {

  static defaultProps = {
    loading: false
  };

  state = {
    openEdit: false,
    openDelete: false,
    wallet: {},
    error: false
  };

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <div className={classes.wrapper}>
            Hello Wallet!
          </div>
        </Paper>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(MainComponent));
