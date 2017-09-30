import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  updateLanguageSuccess, 
  deleteLanguageSuccess,
  showPopup,
 } from '../actions';
import api from '../api';
import LanguageRow from '../components/LanguageRow';

const mapDispatchToProps = (dispatch) => ({
  updateLanguage(response, prevCode){
    dispatch(updateLanguageSuccess(response, prevCode));
  },
  deleteLanguage(code){
    dispatch(deleteLanguageSuccess(code));
  },
  showPopupMessage(message){
    dispatch(showPopup(message));
  },
});

class LanguageRowContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editErrors: null,
      deleting: false,
      deleteErrors: false,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(newLang) {
    const { 
      language: prevLang, 
      updateLanguage, 
      showPopupMessage 
    } = this.props;

    this.setState({ editing: true, editErrors: null });
    api.Languages.update({ ...prevLang, ...newLang })
      .then((response) => {
        updateLanguage(response, prevLang.code);
        this.setState({ editing: false, editErrors: null });
      })
      .catch(e => {
        if(!e.response) {
          showPopupMessage('Problem occurred connecting to server');
        }
        this.setState({ editing: false, editErrors: e.response.body });
      })
  }

  handleDelete() {
    const { language, deleteLanguage, showPopupMessage } = this.props;
    
    this.setState({ deleting: true, deleteErrors: null });
    api.Languages.delete(language.uuid)
      .then(() => {
        deleteLanguage(language.code);
        //this.setState({ deleting: false, deleteErrors: null });
      })
      .catch(e => {
        showPopupMessage('Problem occurred deleting language');
        this.setState({ deleting: false, deleteErrors: true });
      });
  }

  render() {
    const { language } = this.props;
    const { editing, deleting, editErrors } = this.state;
    return (
      <LanguageRow
        language={language}
        editing={editing}
        deleting={deleting}
        editErrors={editErrors}
        onEditSubmit={this.handleEdit}
        onDelete={this.handleDelete} />
    );
  }
}

export default connect(null, mapDispatchToProps)(LanguageRowContainer);