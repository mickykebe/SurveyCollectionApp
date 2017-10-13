import { connect } from 'react-redux';
import { change } from 'redux-form';
import QuestionGroupList from '../components/QuestionGroupList';
import { surveyFormName } from '../constants';

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue(field, value) {
    dispatch(change(surveyFormName, field, value));
  }
});

export default connect(null, mapDispatchToProps)(QuestionGroupList);