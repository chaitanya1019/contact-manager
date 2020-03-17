import React, { useContext, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import AlertContext from '../../context/alert/alertContext';
import AlertReducer from '../../context/alert/alertReducer';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    <Fragment>
      {alerts.length > 0
        ? alerts.map(alert => <div key={alert.id}>{alert.msg}</div>)
        : null}
    </Fragment>
  );
};

export default Alerts;
