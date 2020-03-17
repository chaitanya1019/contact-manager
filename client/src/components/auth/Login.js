import React, { useState, useContext, useEffect } from 'react';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    },
    width: 400,
    margin: 'auto',
    textAlign: 'center'
  }
  // button: {
  //   marginBottom: theme.spacing(1)
  // }
}));

const Login = props => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Crendentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill all fields', 'danger');
    } else {
      login(user);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
          fullWidth
          size="small"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
          value={password}
          onChange={onChange}
          size="small"
          required
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          // className={classes.button}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
