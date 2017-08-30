import React from 'react';
import Input from 'material-ui/Input';

function BlankAnswer(props) {
  const placeholder = props.placeholder || 'Answer';
  return (
    <Input placeholder={placeholder} disabled={true} fullWidth={true} />
  );
}

export default BlankAnswer;