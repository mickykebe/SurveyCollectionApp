import React from 'react';
import { Field } from 'redux-form';
import SelectField from '../../controls/SelectField';

function DateAnswer() {
  const calendarOptions = [
    {
      val: 'gr',
      label: 'Gregorian'
    },
    {
      val: 'eth',
      label: 'Ethiopian'
    }
  ];

  return (
    <Field
      name="calendar"
      component={SelectField}
      label="Calendar Type"
      options={calendarOptions} />
  );
}

export default DateAnswer;
