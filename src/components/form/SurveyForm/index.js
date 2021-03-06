import React from 'react';
import SurveyFormContainer from './containers/SurveyFormContainer'
import { uuidv4 } from '../../../utils';

function SurveyFormWrapper({ initialValues: initValuesProp, ...props }) {
  const initialValues = initValuesProp || {
    uuid: uuidv4(),
    languages: ['en'],
    active: false,
    groupRoot: {
      uuid: uuidv4(),
      root: true,
      index: 1,
      groupElements: [{ 
        uuid: uuidv4(), 
        schema: 'question',
        type: 'text',
        condition: { operator: '&&', conditions: [] },
        required: true,
      }] 
    }
  };

  return (
    <SurveyFormContainer initialValues={initialValues} rootGroupId={initialValues.groupRoot.uuid} {...props} />
  )
}

export default SurveyFormWrapper;