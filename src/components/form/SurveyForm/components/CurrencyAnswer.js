import React from 'react';
import { Field } from 'redux-form';
import SelectField from 'components/form/controls/SelectField';

function CurrencyAnswer({ currencies }) {
  const currencyOptions = currencies.map(c => ({ val: c.uuid, label: c.code }));

  return (
    <Field
      name="currencies"
      component={SelectField}
      label="Currency"
      multiple={true}
      options={currencyOptions} />
  );
}

export default CurrencyAnswer;