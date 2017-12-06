import React, { Component } from 'react';
import { connect } from 'react-redux';
import { surveyFetch, surveyUpdate, showPopup } from '../actions';
import api from '../api';
import AppCircularProgress from '../components/AppCircularProgress';
import Content from '../components/Content';
import { 
  getIsFetchingSurvey,
  getSurveyFormData,
  getIsUpdatingSurvey
} from '../reducers';
import SurveyForm from '../components/form/SurveyForm';

const mapStateToProps = (state, { id }) => ({
  surveyFormData: getSurveyFormData(state, id),
  isFetching: getIsFetchingSurvey(state, id),
  isUpdating: getIsUpdatingSurvey(state, id),
});

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
    const { surveyFormData, history, updateSurvey, displayPopup, isUpdating } = this.props;
    const active = surveyFormData.active;
    if(!isUpdating) {
      updateSurvey(data)
        .then(() => {
          displayPopup('Survey updated successfully');
          if(active !== data.active) {
            history.push('/');
          }
        })
        .catch(e => displayPopup('Error occurred updating survey'));
    }
  }

  componentDidMount() {
    const { id, fetchSurvey, displayPopup, isFetching } = this.props;
    console.log('Edit mounted');

    if(!isFetching) {
      fetchSurvey(id)
      .catch(e => displayPopup('Error occurred fetching survey'));
    }
  }

  render() {
    const { surveyFormData, isFetching, isUpdating } = this.props;
    console.log(surveyFormData);
    if(!surveyFormData && isFetching) {
      return (
        <Content>
          <AppCircularProgress />
        </Content>
      );
    }
    if(!surveyFormData && !isFetching) {
      return null;
    }
    return (
      <Content>
        <SurveyForm
          initialValues={surveyFormData}
          onSubmit={this.handleSubmit}
          submittingForm={isUpdating} />
      </Content>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEdit);