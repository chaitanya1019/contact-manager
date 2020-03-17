import React, { useState, useContext, useEffect } from 'react';
import {
  Paper,
  Radio,
  TextField,
  RadioGroup,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactContext from '../../context/contact/contactContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    }
    // textAlign: 'center',
  },
  button: {
    marginBottom: theme.spacing(1)
  }
}));

const ContactForm = () => {
  const classes = useStyles();
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  const { name, email, phone, type } = contact;
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" gutterBottom>
        {current ? 'Edit Contact' : 'Add Contact'}
      </Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}>
        <TextField
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
          id="phone"
          name="phone"
          label="Phone"
          variant="outlined"
          placeholder="Phone"
          value={phone}
          onChange={onChange}
          size="small"
          required
          fullWidth
        />
        {/* <TextField id="type" label="Outlined" variant="outlined" /> */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Contact Type</FormLabel>
          <RadioGroup
            aria-label="contact-type"
            name="type"
            value={type}
            onChange={onChange}>
            <FormControlLabel
              value="personal"
              control={<Radio checked={type === 'personal'} />}
              label="Personal"
            />
            <FormControlLabel
              value="professional"
              control={<Radio checked={type === 'professional'} />}
              label="Professional"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          className={classes.button}>
          {current ? 'Update Contact' : 'Add Contact'}
        </Button>
        {current && (
          <Button variant="outlined" fullWidth onClick={clearAll}>
            Clear
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default ContactForm;
