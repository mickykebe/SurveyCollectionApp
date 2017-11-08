import React from 'react';
import { connect } from 'react-redux';
import { getIsAuthenticating, getRegisterErrors } from '../reducers';
import Register from '../components/Register';

const mapStateToProps = (state) => ({
  isAuthenticating: getIsAuthenticating(state),
  errors: getRegisterErrors(state),
});

export default connect(mapStateToProps)(Register);