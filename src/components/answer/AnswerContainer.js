import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import AnswerHome from './AnswerHome';
import DetailAnswer from './DetailAnswer';

class AnswerContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = { home: true };
  }
  
  render() {
    return (
      <div>
        {
          this.state.home &&
          <AnswerHome onResponseClick={() => this.setState({ home: false })} />
        }
        {
          !this.state.home &&
          <DetailAnswer />
        }
      </div>
    );
  }
}

export default AnswerContainer;