import React, { Component } from "react";
import { connect } from "react-redux";
import { getIsCommonDataLoaded } from "../reducers";
import {
  fetchCurrenciesSuccess,
  fetchLanguagesSuccess,
  fetchPermissionsSuccess,
  commonDataLoaded
} from "../actions";
import api from "../api";
import ConnectionError from "../components/ConnectionError";
import Loading from "../components/Loading";

const mapStateToProps = state => ({
  dataLoaded: getIsCommonDataLoaded(state)
});

const mapDispatchToProps = dispatch => ({
  languagesFetchSuccess(response) {
    return dispatch(fetchLanguagesSuccess(response));
  },
  currenciesFetchSuccess(response) {
    return dispatch(fetchCurrenciesSuccess(response));
  },
  permissionsFetchSuccess(response) {
    return dispatch(fetchPermissionsSuccess(response));
  },
  commonDataLoadedSuccess() {
    return dispatch(commonDataLoaded());
  }
});

class CommonDataLoader extends Component {
  state = {
    loading: false,
    errors: null
  };

  fetchData = () => {
    const {
      languagesFetchSuccess,
      currenciesFetchSuccess,
      commonDataLoadedSuccess,
      permissionsFetchSuccess
    } = this.props;

    this.setState({ loading: true, errors: null });
    Promise.all([
      api.Languages.all(),
      api.Currencies.all(),
      api.Permissions.all()
    ])
      .then(responses => {
        languagesFetchSuccess(responses[0]);
        currenciesFetchSuccess(responses[1]);
        permissionsFetchSuccess(responses[2]);
        commonDataLoadedSuccess();
        this.setState({ loading: false, errors: null });
      })
      .catch(
        e => console.log(e) || this.setState({ loading: false, errors: e })
      );
  };

  componentDidMount() {
    if (!this.props.dataLoaded) {
      this.fetchData();
    }
  }

  render() {
    const { children, dataLoaded } = this.props;
    const { loading, errors } = this.state;

    if (!loading && !!errors) {
      return (
        <ConnectionError
          text="Problem occurred loading app data"
          retry={() => this.props.loadAppData()}
        />
      );
    }

    if (loading) {
      return <Loading text="Loading app data..." />;
    }

    if (dataLoaded) {
      return children;
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonDataLoader);
