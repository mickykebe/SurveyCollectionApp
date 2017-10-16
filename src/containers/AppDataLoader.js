import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getCurrentUser,
  getAppDataLoaded,
  getAppDataLoading,
  getAppDataLoadError } from '../reducers';
import { appDataLoad } from '../actions';
import api from '../api';
import ScreenLoading from '../components/ScreenLoading';
import ScreenError from '../components/ScreenError';

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  appDataLoaded: getAppDataLoaded(state),
  appDataLoading: getAppDataLoading(state),
  appDataLoadError: getAppDataLoadError(state),
});

const mapDispatchToProps = dispatch => ({
  loadAppData() {
    return dispatch(appDataLoad(api.Languages.all()));
  }
});

class AppDataLoader extends Component {
  componentWillMount() {
    const { currentUser, appDataLoaded } = this.props;
    if(currentUser && !appDataLoaded) {
      this.props.loadAppData();
    }
  }

  render() {
    const { appDataLoading, appDataLoadError, appDataLoaded, children } = this.props;

    if(!appDataLoading && appDataLoadError) {
      return (<ScreenError text="Problem occurred fetching app data." retry={this.props.loadAppData} />);
    }

    if(appDataLoading) {
      return <ScreenLoading text="Loading app data..." />;
    }

    if(appDataLoaded) {
      return <div>{children}</div>
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDataLoader);