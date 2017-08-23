import React from 'react';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router';

function LoggedOutMenu({ history }) {
  return (
    <div>
      <Button color="contrast" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button color="contrast" onClick={() => history.push('/register')}>
        Register
      </Button>
    </div>
  );
}

export default withRouter(LoggedOutMenu);