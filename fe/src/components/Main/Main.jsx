import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

import Card, { CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

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
    this.props.getBalance();
    this.props.getTransactions();
  }

  render() {
    const { classes, wallet: { balance, loadingBalance, transactions, loadingTransactions } } = this.props;

    console.log('loadingTransactions', loadingTransactions);
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Card className={classes.card} key='1'>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.title}>
                  Balance
                </Typography>
              <div>
                {loadingBalance &&
                <div className={classes.dialogButtonWrapper}>
                  <CircularProgress size={24} className={classes.dialogButtonProgress} />
                </div>}
                {!loadingBalance
                && <Typography variant='subheading' color='textSecondary' className={classes.balance}>
                  {balance} Coins
                </Typography>}
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
                  {!loadingTransactions && transactions.map(n => {
                    return (
                      <TableRow key={`row_${n.index}`}>
                        <TableCell>{moment(n.timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell numeric>{n.from}</TableCell>
                        <TableCell numeric>{n.to}</TableCell>
                        <TableCell numeric>{n.amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {loadingTransactions &&
              <div className={classes.dialogButtonWrapper}>
                <CircularProgress size={24} className={classes.dialogButtonProgress} />
              </div>}
            </CardContent>
          </Card>
        </div>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(MainComponent));
