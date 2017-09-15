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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.surveyId;
  return {
    surveyFormData: getSurveyFormData(state, id),
    isFetching: getIsFetchingSurvey(state, id),
    isUpdating: getIsUpdatingSurvey(state, id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSurvey(id) {
    return dispatch(surveyFetch(api.Surveys.get(id), { id }));
  },
  updateSurvey(survey) {
    return dispatch(surveyUpdate(api.Surveys.update(survey), { id: survey.uuid }));
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
    const { history, updateSurvey, displayPopup, isUpdating } = this.props;
    if(!isUpdating) {
      updateSurvey(data)
        .then(() => {
          displayPopup('Survey updated successfully');
          history.push('/');
        })
        .catch(e => displayPopup('Error occurred updating survey'));
    }
  }

  componentDidMount() {
    const { fetchSurvey, match, displayPopup, isFetching } = this.props;
    const { surveyId } = match.params;

    if(!isFetching) {
      fetchSurvey(surveyId)
      .catch(e => displayPopup('Error occurred fetching survey'));
    }
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