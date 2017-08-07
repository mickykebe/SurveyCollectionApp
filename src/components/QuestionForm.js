import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Field } from 'redux-form';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { renderMenuSelectField } from './form/fieldRenderers';
import mockData from '../mockData';
import QuestionTitle from './form/QuestionTitle';
import QuestionTypeContainer from './QuestionTypeContainer';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: '16px',
  },
  actionButton: {
    margin: theme.spacing.unit,
  }
}));

const mapStateToProps = (state) => {
  const allLanguages = Object.keys(mockData.languages).map((key) => mockData.languages[key]);
  const activeLanguageKeys = (state.form && state.form.surveyForm && state.form.surveyForm.values && state.form.surveyForm.values.languages) || [];
  const activeLanguages = allLanguages.filter((ln) => activeLanguageKeys.indexOf(ln.key) > -1);

  return {
    activeLanguages
  };
};

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = { questionType: '' };
    this.onQuestionTypeChange = this.onQuestionTypeChange.bind(this);
  }

  onQuestionTypeChange(e, value) {
    this.setState({
      questionType: value,
    });
  }

  render() {
    const { classes, question, index, activeLanguages } = this.props;
    const { onRemove } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography type="subheading" align="center">
            {`Question #${index+1}`}
          </Typography>
          <Field
            name={`${question}.type`}
            component={renderMenuSelectField}
            label='Question Type'
            options={[{val: 'text', label: 'Short Answer'}, {val: 'choose-one', label: 'Multiple Choice'}, ]}
            fullWidth={true}
            margin="normal"
            onChange={this.onQuestionTypeChange}
            />
          <QuestionTitle
            question={question}
            activeLanguages={activeLanguages} />
          <QuestionTypeContainer 
            questionIndex={index}
            activeLanguages={activeLanguages} />
        </CardContent>
        <CardActions>
          <IconButton className={classes.actionButton}>
            <DeleteIcon onClick={onRemove} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(stylesheet),
)(QuestionForm);