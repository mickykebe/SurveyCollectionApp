import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../reducers';
import ProfilesSidebar from '../components/ProfilesSidebar';
import api from '../api';
import { profilesFetchSuccess } from '../actions';

const mapStateToProps = (state) => ({
  profiles: getProfiles(state),
});
const mapDispatchToProps = (dispatch) => ({
  profilesFetched(response) {
    dispatch(profilesFetchSuccess(response));
  }
})

class ProfilesSidebarContainer extends Component {
  state = {
    loading: false,
    error: false,
  }

  componentDidMount() {
    const { profiles, profilesFetched } = this.props;

    if(profiles.length === 0) {
      this.setState({
        loading: true,
        error: false,
      });
      api.Profiles.all()
        .then(response => {
          profilesFetched(response);
          this.setState({
            loading: false,
            error: false,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            loading: false,
            error: true,
          });
        })
    }
  }

  render() {
    const { profiles } = this.props;
    const { loading, error } = this.state;

    return (
      <ProfilesSidebar
        loading={loading}
        error={error}
        profiles={profiles} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesSidebarContainer);