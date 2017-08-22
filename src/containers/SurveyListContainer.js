import { connect } from 'react-redux';
import { getAllSurveys } from 'reducers';
import SurveyList from 'components/SurveyList';

const mapStateToProps = (state) => ({
  surveys: getAllSurveys(),
});

export default connect(mapStateToProps)(SurveyList);