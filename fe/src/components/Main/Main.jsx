import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import { isEmpty } from 'lodash';

import Card, { CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';

import * as actions from 'redux/actions/walletActions';

import styles from './styles';
import theme from './theme';

class MainComponent extends Component {

  static defaultProps = {
    loading: false
  };

  state = {
    openSend: false,
    nt: {},
    wallet: {},
    error: false
  };

  componentDidMount() {
    this.props.getBalance();
    this.props.getTransactions();
  }

  componentWillReceiveProps(newProps) {
    if (isEmpty(newProps.wallet.error) && !newProps.wallet.loadingSend && this.props.wallet.loadingSend) {
      this.handleClose();
    }
  }

  handleClickOpenSend = () => {
    this.setState({ openSend: true });
  };

  handleClose = () => {
    this.setState({
      openSend: false,
      nt: {}
    });
  };

  handleSend = () => {
    this.props.sendNt({ nt: this.state.nt });
  }

  handleChange = (val, field) => {
    this.setState((state) => {
      const nt = { ...state.nt };

      nt[field] = val;

      return {
        ...state,
        nt
      };
    });
  };

  parseError(error, classes) {
    if (error && error.error) {
      const errors = error.error;

      return Object.keys(errors).map((key) => {
        if (errors[key][0]) return <div className={classes.error}>{ errors[key][0] }</div>;
      });
    }
    return null;
  }

  renderSendDialog() {
    const { classes, wallet: { error, loadingSend } } = this.props;

    return (<Dialog
      open={this.state.openSend}
      onClose={this.handleClose}
      aria-labelledby='form-dialog-title'
            >
      <DialogTitle id='form-dialog-title'>Send Coins</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='to'
          label='To'
          type='text'
          fullWidth
          onChange={(e) => this.handleChange(e.target.value, 'to')}
        />
        <TextField
          margin='dense'
          id='amount'
          label='Amount'
          type='text'
          fullWidth
          onChange={(e) => this.handleChange(e.target.value, 'amount')}
        />
        {error && this.parseError(error, classes) }
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} raised color='accent'>
          Cancel
        </Button>
        <div className={classes.dialogButtonWrapper}>
          <Button
            onClick={this.handleSend} raised color='primary'
          >
            Send
          </Button>
          {loadingSend && <CircularProgress size={24} className={classes.dialogButtonProgress} />}
        </div>
      </DialogActions>
    </Dialog>);
  }

  render() {
    const { classes, wallet: { balance, loadingBalance, transactions, loadingTransactions } } = this.props;

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
              <Button variant='raised' color='primary' className={classes.button}
                onClick={this.handleClickOpenSend}
              >
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
                    <TableCell>To</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loadingTransactions && transactions.map(n => {
                    return (
                      <TableRow key={`row_${n.index}`}>
                        <TableCell>{moment(n.timestamp).format('MM-DD-YYYY HH:mm:ss')}</TableCell>
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
          {this.renderSendDialog()}
        </div>
      </MuiThemeProvider>);
  }
}

export default connect(state => state, actions)(withStyles(styles)(MainComponent));
