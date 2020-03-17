import React, { useEffect, useContext } from 'react';
import { Typography } from '@material-ui/core';
import Contacts from '../contacts/Contacts';
import { Grid, Paper } from '@material-ui/core';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  //eslint-disable-next-line
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ContactForm />
        {/* <Paper className={classes.paper}>xs</Paper> */}
      </Grid>
      <Grid item xs>
        <ContactFilter />
        <Contacts />
      </Grid>
    </Grid>
  );
};

export default Home;
