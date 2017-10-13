import React from 'react';
import SurveyFormContainer from './containers/SurveyFormContainer'
import { uuidv4 } from '../../../utils';

function SurveyFormWrapper({ initialValues: initValuesProp, ...props }) {
  const initialValues = initValuesProp || {
    uuid: uuidv4(),
    languages: ['en'],
    groupRoot: {
      uuid: uuidv4(),
      root: true,
      index: 1,
      groupElements: [{ 
        uuid: uuidv4(), 
        schema: 'question', 
        index: 1,
        type: 'text',
        condition: { operator: '&&', conditions: [] }
      }] 
    }
  };

  return (
    <SurveyFormContainer initialValues={initialValues} rootGroupId={initialValues.groupRoot.uuid} {...props} />
  )
}

export default SurveyFormWrapper;