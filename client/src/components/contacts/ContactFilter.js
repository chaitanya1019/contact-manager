import React, { useContext, useRef, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = e => {
    if (text.current.value !== null) {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <TextField
        type="text"
        ref={text}
        placeholder="Filter contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
