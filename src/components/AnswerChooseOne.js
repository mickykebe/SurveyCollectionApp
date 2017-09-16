import React from 'react';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { valFromLangObj } from '../utils';

function AnswerChooseOne({ choice, value }) {
  return (
    <FormControlLabel control={<Radio checked={true} disabled={true} />} label={valFromLangObj(choice.text)} />
  )
}

export default AnswerChooseOne;