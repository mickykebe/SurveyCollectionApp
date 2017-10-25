import React, { Component } from 'react';
import ScreenLoading from './ScreenLoading';
import ScreenError from './ScreenError';

class DataLoadProgress extends Component {
  state = {
    loading: false,
    errorLoading: null,
  };

  loadData = () => {
    const { onLoad, onLoadSuccess, onLoadFail } = this.props;
    this.setState({
      loading: true,
      errorLoading: null,
    });
    onLoad()
      .then((data) => {
        if(onLoadSuccess) {
          onLoadSuccess(data);
        }
        this.setState({ loading: false, errorLoading: null });
      })
      .catch((e) => {
        if(onLoadFail) {
          onLoadFail(e);
        }
        this.setState({ loading: false, errorLoading: e || true });
      });
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    const { loading, errorLoading } = this.state;
    const { loadingText = 'Loading data', loadingErrorText = 'Problem occurred connecting to server' } = this.props;

    if(!loading && errorLoading) {
      return (
        <ScreenError text={loadingErrorText} retry={this.loadData} />
      );
    }

    if(loading) {
      return <ScreenLoading text={loadingText} />
    }

    return this.props.children;
  }
}

export default DataLoadProgress;