import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { FormLabel } from 'material-ui/Form';
import { renderTextField } from 'components/form/helper/fieldRenderers';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    flex: 1,
    textAlign: 'right',
    paddingRight: '16px',
  },
  fieldsContainer: {
    flex: 3
  }
}));

class LangTextField extends Component{
  render() {
    const { classes, baseFieldName, label, languages } = this.props;
    return (
      <div className={classes.root}>
        <FormLabel className={classes.label}>
          {label}
        </FormLabel>
        <div className={classes.fieldsContainer}>
          {
            languages.map((ln) => 
              <Field
                key={ln.code}
                label={`(${ln.name})`}
                name={`${baseFieldName}.${ln.code}`}
                component={renderTextField}
                required={true}
                fullWidth={true}
                margin="normal"
                />
            )
          }
        </div>
      </div>
    )
  }

}

export default withStyles(stylesheet)(LangTextField);