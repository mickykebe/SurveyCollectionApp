import { connect } from 'react-redux';
import { getLanguage } from 'reducers';
import SurveyCard from 'components/SurveyCard';

const mapStateToProps = (state, { languages: langIds}) => ({
  languages: langIds.map((id) => getLanguage(undefined, id)),
});

export default connect(mapStateToProps)(SurveyCard);

