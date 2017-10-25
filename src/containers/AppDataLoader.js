import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppDataLoaded } from '../reducers';
import { appDataLoad } from '../actions';
import api from '../api';
import DataLoadProgress from '../components/DataLoadProgress';

const mapStateToProps = state => ({
  appDataLoaded: getAppDataLoaded(state),
});

const mapDispatchToProps = dispatch => ({
  loadAppData(response) {
    return dispatch(appDataLoad(response));
  }
});

class AppDataLoader extends Component {
  render() {
    const { appDataLoaded, loadAppData, children } = this.props;
    if(appDataLoaded) {
      return children;
    }
    return (
      <DataLoadProgress
        loadingText="Loading app data..."
        onLoad={() => api.Languages.all()}
        onLoadSuccess={loadAppData} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDataLoader);