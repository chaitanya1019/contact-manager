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

const Register = props => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { registerUser, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, passwordConfirm } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      //   setAlert('Please fill all fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" gutterBottom>
        Registration
        {/* {current ? 'Edit Contact' : 'Add Contact'} */}
      </Typography>
      <form
        className={classes.root}
        // noValidate
        autoComplete="off"
        onSubmit={onSubmit}>
        <TextField
          type="text"
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={onChange}
          required
          fullWidth
          size="small"
        />
        <TextField
          id="email"
          type="email"
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
          type="text"
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
          value={password}
          onChange={onChange}
          size="small"
          min={6}
          required
          fullWidth
        />
        <TextField
          type="text"
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={onChange}
          size="small"
          minLength="6"
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
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
