import React from 'react';
import SurveyFormContainer from './containers/SurveyFormContainer'
import { uuidv4 } from '../../../utils';

function SurveyFormWrapper({ initialValues: initValuesProp }) {
  const initialValues = initValuesProp || {
    uuid: uuidv4(),
    languages: ['en'],
    groupRoot: {
      uuid: uuidv4(),
      root: true,
    }
  };

  return (
    <SurveyFormContainer initialValues={initialValues} />
  )
}

export default SurveyFormWrapper;