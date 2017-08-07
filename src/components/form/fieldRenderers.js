import React from 'react';
import TextField from 'material-ui/TextField';
import MultiChoiceField from './MultiChoiceField';
import MenuSelectField from './MenuSelectField';

export const renderTextField = ({
  label, 
  input,
  meta: { error },
  ...custom
}) =>
  <TextField 
    label={label}
    placeholder={label}
    error={!!error}
    helperText={error}
    {...input}
    {...custom}
    />;

export const renderMultiChoiceField = ({
  input,
  meta,
  ...custom
}) => {
  return <MultiChoiceField
    {...input}
    {...meta}
    {...custom} />
}

export const renderMenuSelectField = ({
  input,
  meta,
  ...custom
}) => {
  return <MenuSelectField
    {...input}
    {...meta}
    {...custom} />
}