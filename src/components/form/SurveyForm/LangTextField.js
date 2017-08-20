import React, { Component } from 'react';
import classnames from 'classnames';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { FormLabel } from 'material-ui/Form';
import { renderAlignedTextField } from 'components/form/helper/fieldRenderers';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    textAlign: 'right',
    paddingRight: '16px',
  },
  fieldsContainer: {
    flex: 1
  }
};

class LangTextField extends Component{
  render() {
    const { 
      classes, 
      labelClassName, 
      inputGroupClassName, 
      className, 
      label, 
      languages 
    } = this.props;

    return (
      <div className={classnames(classes.root, className)}>
        <FormLabel className={classnames(classes.label, labelClassName)}>
          {label}
        </FormLabel>
        <div className={classnames(classes.fieldsContainer, inputGroupClassName)}>
          {
            languages.map((ln) => 
              <Field
                key={ln.code}
                label={`(${ln.name})`}
                name={`${ln.code}`}
                component={renderAlignedTextField}
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

export default withStyles(styles)(LangTextField);