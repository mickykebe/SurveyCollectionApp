import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIsAppDataLoading, getAppDataLoaded, getAppDataLoadError } from '../reducers';
import { appDataLoad } from '../actions';
import api from '../api';
import ScreenError from '../components/ScreenError';
import ScreenLoading from '../components/ScreenLoading';

const mapStateToProps = state => ({
  appDataLoading: getIsAppDataLoading(state),
  appDataLoaded: getAppDataLoaded(state),
  appDataLoadError: getAppDataLoadError(state),
});

const mapDispatchToProps = dispatch => ({
  loadAppData() {
    return dispatch(appDataLoad(api.Languages.all()));
  }
});

class AppDataLoader extends Component {
  componentWillMount() {
    const { appDataLoaded, loadAppData } = this.props;

    if(!appDataLoaded) {
      loadAppData();
    }
  }

  render() {
    const { 
      appDataLoading: loading,
      appDataLoaded: loaded,
      appDataLoadError: loadError, 
      children 
    } = this.props;

    if(loaded) {
      return children;
    }

    if(!loading && loadError) {
      return <ScreenError text="Problem occurred loading app data" retry={() => this.props.loadAppData()} />
    }

    if(loading) {
      return <ScreenLoading text="Loading app data..." />
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDataLoader);