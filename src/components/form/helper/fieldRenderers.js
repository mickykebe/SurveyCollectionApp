import React from 'react';
import TextField from 'material-ui/TextField';
import AlignedTextField from '../AlignedTextField';
import MultiChoiceField from '../MultiChoiceField';
import MenuSelectField from '../MenuSelectField';

const renderTextFieldComponent = ({
  label, 
  input,
  meta: { touched, error },
  ...custom
}) => 
  (Component) => 
    <Component
      label={label}
      placeholder={label}
      error={touched && !!error}
      helperText={touched && error}
      {...input}
      {...custom}
      />;

export const renderHiddenInput = ({
  input,
}) => 
  <input 
    type="hidden"
    {...input} />;

export const renderTextField = (props) => 
  renderTextFieldComponent(props)(TextField);

export const renderAlignedTextField = (props) =>
  renderTextFieldComponent(props)(AlignedTextField);

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