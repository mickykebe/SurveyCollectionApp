import { Component } from "react";
import { connect } from "react-redux";
import { surveyFetch } from "../actions";
import api from "../api";
import {
  getSurvey,
  getIsFetchingSurvey,
  getSurveyFetchErrors
} from "../reducers";

const mapStateToProps = (state, { id }) => ({
  survey: getSurvey(state, id),
  isFetching: getIsFetchingSurvey(state, id),
  errors: getSurveyFetchErrors(state, id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchSurvey() {
    return dispatch(
      surveyFetch(api.Surveys.get(id), { id }, state => getSurvey(state, id))
    );
  }
});

class SurveyContainer extends Component {
  static defaultProps = {
    onLoadSuccess: () => {},
    skipFetchIfExists: true
  };

  fetchSurvey() {
    const {
      survey,
      fetchSurvey,
      onLoadSuccess,
      skipFetchIfExists
    } = this.props;
    if (survey && skipFetchIfExists) {
      onLoadSuccess(survey);
    } else {
      fetchSurvey().then(survey => onLoadSuccess(survey));
    }
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  render() {
    const { survey, isFetching, errors } = this.props;
    return this.props.render({
      survey,
      isFetching,
      errors,
      fetchSurvey: this.fetchSurvey
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
