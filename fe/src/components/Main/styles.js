export default theme => ({
  root: {
    paddingRight: 2,
    maxWidth: 700,
    margin: '0 auto'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.A700,
        backgroundColor: theme.palette.secondary.A100
      }
      : {
        color: theme.palette.secondary.A100,
        backgroundColor: theme.palette.secondary.A700
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  button: {
    margin: '5px'
  },

  dialogButtonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  dialogButtonProgress: {
    color: '#2196f3',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  error: {
    color: '#FF4081'
  },

  card: {
    minWidth: 275,
    margin: '0 auto'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
