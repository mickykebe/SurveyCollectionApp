import React from 'react';
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