import { connect } from 'react-redux';
import { getAllSurveys } from 'reducers';
import SurveyList from 'components/SurveyList';
import { REDIRECT_TO } from 'actionTypes';

const mapStateToProps = (state) => ({
  surveys: getAllSurveys(),
});

const mapDispatchToProps = (dispatch) => ({
  redirectToNewSurvey: () => 
    dispatch({ type: REDIRECT_TO, path: '/surveys/new' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);