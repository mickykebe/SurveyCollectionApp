import React, { Component } from 'react';
import { connect } from 'react-redux';
import LanguageRowForm from '../components/LanguageRowForm';
import api from '../api';
import { showPopup, createLanguageSuccess } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  showPopupMessage(message) {
    dispatch(showPopup(message));
  },
  createLanguage(response) {
    dispatch(createLanguageSuccess(response));
  }
})

class AddLanguageRowContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { inProgress: false, errors: null };
    this.addLanguage = this.addLanguage.bind(this);
  }

  addLanguage(language) {
    const { showPopupMessage, createLanguage } = this.props;
    this.setState({ inProgress: true, errors: null });
    api.Languages.create(language)
      .then((response) => {
        createLanguage(response);
        this.setState({ inProgress: false, errors: null });
      })
      .catch((e) => {
        if(!e.response) {
          showPopupMessage('Problem occurred connecting to server');
        }
        const error = (e.response && e.response.body) || true;
        this.setState({ inProgress: false, errors: error });
      })
  }

  render() {
    const { errors, inProgress } = this.state;

    return(
      <LanguageRowForm
        onSubmit={this.addLanguage}
        errors={errors}
        inProgress={inProgress}
        submitLabel="Add" />
    );
  }
}

export default connect(null, mapDispatchToProps)(AddLanguageRowContainer);