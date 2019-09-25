import React, { Fragment } from 'react';
import Error from './Error';

function Errors(props) {
  return (
    <Fragment>
      {props.errors.map(err => (
        <Error error={err} key={err.id} />
      ))}
    </Fragment>
  );
}

export default Errors;
