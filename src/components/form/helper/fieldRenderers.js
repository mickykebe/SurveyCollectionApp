import React from 'react';
import TextField from 'material-ui/TextField';
import { Multiselect } from 'react-widgets';
import AlignedTextField from 'components/form/controls/AlignedTextField';
import MultiChoiceField from 'components/form/controls/MultiChoiceField';
import MenuSelectField from 'components/form/controls/MenuSelectField';

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

export const renderMultiSelectField = ({
  input,
  meta,
  ...custom
}) =>
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []}
    {...custom} />;