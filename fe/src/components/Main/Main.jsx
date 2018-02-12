import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.title}>
                <h1>Balance</h1>
              </Typography>
              <Typography component='p'>
                <h2>
                    1000 Coins
                  </h2>
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(MainComponent));
