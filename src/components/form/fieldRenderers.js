import React from 'react';
import TextField from 'material-ui/TextField';
import AlignedTextField from './AlignedTextField';
import MultiChoiceField from './MultiChoiceField';
import MenuSelectField from './MenuSelectField';

const renderTextFieldComponent = ({
  label, 
  input,
  meta: { error },
  ...custom
}) => 
  (Component) => 
    <Component
      label={label}
      placeholder={label}
      error={!!error}
      helperText={error}
      {...input}
      {...custom}
      />;

export const renderTextField = (props) => 
  renderTextFieldComponent(props)(TextField);

export const renderAlignedTextField = (props) =>
  renderTextFieldComponent(props)(AlignedTextField);

/* export const renderTextField = ({
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
    />; */

export const renderMultiChoiceField = ({
  input,
  meta,
  ...custom
}) =>
  <MultiChoiceField
    {...input}
    {...meta}
    {...custom} />

export const renderMenuSelectField = ({
  input,
  meta,
  ...custom
}) => 
  <MenuSelectField
    {...input}
    {...meta}
    {...custom} />;