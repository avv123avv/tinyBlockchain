import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

import Card, { CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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
    openSend: false,
    wallet: {},
    error: false
  };

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    const data = [];

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Card className={classes.card} key='1'>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.title}>
                  Balance
                </Typography>
              <div className={classes.balance}>
                  1000 Coins
                </div>
              <Button variant='raised' color='primary' className={classes.button}>
                  Send Cash
                </Button>
            </CardContent>
          </Card>
          <Card className={classes.card} key='2'>
            <CardContent className={classes.cardContentTransactions}>
              <Typography className={classes.title}>
                  Transactions History
                </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => {
                    return (
                      <TableRow key={n.index}>
                        <TableCell>{n.timestamp}</TableCell>
                        <TableCell numeric>{n.from}</TableCell>
                        <TableCell numeric>{n.to}</TableCell>
                        <TableCell numeric>{n.amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(MainComponent));
