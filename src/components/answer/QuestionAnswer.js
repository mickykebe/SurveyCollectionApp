import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = {
    card: {
      display: 'grid',
      gridGap: 0,
      gridTemplateColumns: '100px 100px 100px',
      maxWidth: '80%',
      margin: '0 auto', 
      
    },
    contents1: {
      gridColumn: 1, 
      gridRow: '1 / span 2',
      
    },
    contentsTypo:{
      paddingTop: 40,
      fontSize: 48,
      textAlign: 'center',
    },
    contents2: {
      gridColumn: '2 / span 8', 

    },
    contents3: {
      gridColumn:'2 / span 8', 
      gridRow: 2 ,
      borderTop: 'solid #EEEEEE 1px'
    },
    
    btn:{
      color: '#2196F3'
    },
    btnWarning:{
      color: 'red'
    }
  };
  
  function QuestionAnswer(props){
    const {classes} = props;
    const question = props.question;
    const answer = props.answer;

    return (
        <div>
          <Card className={classes.card}>
            <CardContent className={classes.contents1}>
              <Typography type="headline" component="h2" color="secondary" className={classes.contentsTypo} >
                {question}1
              </Typography>
            </CardContent>
            <CardContent className={classes.contents2}>
              <Typography type="headline" component="h2" color="secondary" >
                {question}what is your name?
              </Typography>
              
            </CardContent>
            <Divider light="true" />
            <CardContent className={classes.contents3}>
              <Typography component="p" color="secondary">
                Answer
              </Typography>
              <Typography type="subheading" component="h3">
                 {answer} sammy
             </Typography>
            </CardContent>
          </Card>
        
        </div>
    )
   
  }
  
  QuestionAnswer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(QuestionAnswer);