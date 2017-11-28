import { connect } from 'react-redux';
import { surveyUpdate, showPopup } from '../actions';
import api from '../api';
import { 
  getLanguage,
  getDenormalizedSurvey,
  getIsUpdatingSurvey 
} from 'reducers';
import HomeSurveyRow from '../components/HomeSurveyRow';

const mapStateToProps = (state, { survey: { uuid: id, languages: codes }}) => ({
  languages: codes.map((code) => getLanguage(state, code)),
  denormalizedSurvey: getDenormalizedSurvey(state, id),
  isUpdating: getIsUpdatingSurvey(state, id),
});

const mergeProps = (stateProps, { dispatch }, ownProps) => {
  const { denormalizedSurvey, ...restStateProps } = stateProps;

  return ({
    ...restStateProps,
    publish() {
      dispatch(surveyUpdate(
        api.Surveys.update({ ...denormalizedSurvey, active: true }), 
        { id: ownProps.survey.uuid },
      )).then(() => {
        dispatch(showPopup('Survey successfully published'))
      }).catch((e) => {
        console.log(e);
        dispatch(showPopup('Problem occurred publishing survey'));
      });
    },
    ...ownProps,
  })
}

export default connect(mapStateToProps, null, mergeProps)(HomeSurveyRow);