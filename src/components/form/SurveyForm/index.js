import { reduxForm } from 'redux-form';
import { surveyFormName } from './constants';
import validator from './validator';
import SurveyFormContainer from './containers/SurveyFormContainer'
import { uuidv4 } from '../../../utils';

const defaultInitValues = {
  uuid: uuidv4(),
  languages: ['en'],
  groupRoot: {
    uuid: uuidv4(),
    root: true,
  }
};

export const create = (initValues = defaultInitValues) => {
  const config = {
    form: surveyFormName,
    initialValues: initValues,
    validate: validator,
  }
  return reduxForm(config)(SurveyFormContainer);
}

export default create();