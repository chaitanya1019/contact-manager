import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  },
  buttonStyles: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const ContactItem = ({ contact }) => {
  const classes = useStyles();
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <Paper className={classes.paper}>
      <Typography variant="body1">
        {name}{' '}
        <span style={{ float: 'right' }}>
          <Chip
            color={type === 'professional' ? 'secondary' : 'primary'}
            size="small"
            label={type.charAt(0).toUpperCase() + type.slice(1)}
          />
        </span>
      </Typography>
      <List dense={true}>
        <ListItem>
          <ListItemText primary={email} />
        </ListItem>
        <ListItem>
          <ListItemText primary={phone} />
        </ListItem>
      </List>
      <div className={classes.buttonStyles}>
        <Button variant="contained" onClick={() => setCurrent(contact)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Paper>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
