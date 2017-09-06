import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getIsFetchingSurvey, 
  getSurveyFormData,
  getIsUpdatingSurvey
} from '../reducers';
import { surveyFetch, surveyUpdate, showPopup } from '../actions';
import api from '../api';
import SurveyForm from '../components/form/SurveyForm';
import AppCircularProgress from '../components/AppCircularProgress';

const mapStateToProps = (state, ownProps) => ({
  surveyFormData: getSurveyFormData(state, ownProps.match.params.surveyId),
  isFetching: getIsFetchingSurvey(state),
  isUpdating: getIsUpdatingSurvey(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurvey(id) {
    return dispatch(surveyFetch(api.Surveys.get(id), getIsFetchingSurvey));
  },
  updateSurvey(survey) {
    return dispatch(surveyUpdate(api.Surveys.update(survey), getIsUpdatingSurvey))
  },
  displayPopup(message) {
    dispatch(showPopup(message));
  }
});

class SurveyEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { history, updateSurvey, displayPopup } = this.props;
    updateSurvey(data)
      .then(() => {
        displayPopup('Survey updated successfully');
        history.push('/');
      })
      .catch(e => displayPopup('Error occurred updating survey'));
  }

  componentDidMount() {
    const { fetchSurvey, match, displayPopup } = this.props;
    const { surveyId } = match.params;

    fetchSurvey(surveyId)
      .catch(e => displayPopup('Error occurred fetching survey'));
  }

  render() {
    const { surveyFormData, isFetching, isUpdating } = this.props;
    if(!surveyFormData && isFetching) {
      return (
        <div>
          <AppCircularProgress />
        </div>
      );
    }
    return (
      <div>
        <SurveyForm
          initialValues={surveyFormData}
          onSubmit={this.handleSubmit}
          submittingForm={isUpdating} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEdit);