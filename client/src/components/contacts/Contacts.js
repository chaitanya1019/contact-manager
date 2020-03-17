import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //es-lint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <Typography variant="h6">Please add a contact</Typography>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          filtered.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        ) : (
          contacts.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        )
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default Contacts;
