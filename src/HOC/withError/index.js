import React from 'react';
import EB from '../ErrorBoundary'

const withError = (Component) => (props) => {
  return (
    <EB>
      <Component {...props}/>
    </EB>
  );
}

export default withError;
