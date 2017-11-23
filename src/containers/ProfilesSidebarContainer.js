import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentUser } from '../reducers';
import api from '../api';
import { profilesFetchSuccess } from '../actions';
import ProfilesSidebar from '../components/ProfilesSidebar';

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);

  const profiles = getProfiles(state, currentUser.company);
  return {
    currentUser,
    profiles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  profilesFetched(response) {
    dispatch(profilesFetchSuccess(response));
  }
});

class ProfilesSidebarContainer extends Component {
  state = {
    loading: false,
    error: false,
  }

  fetchProfiles = () => {
    const { currentUser, profiles, profilesFetched } = this.props;

    if(profiles.length === 0) {
      this.setState({
        loading: true,
        error: false,
      });
      api.Profiles.all(currentUser.company)
        .then(response => {
          profilesFetched(response);
          this.setState({
            loading: false,
            error: false,
          });
        })
        .catch((e) => {
          this.setState({
            loading: false,
            error: true,
          });
        });
    }
  }

  componentDidMount() {
    this.fetchProfiles();
  }

  render() {
    const { profiles: companyProfiles, currentUser } = this.props;
    const { loading, error } = this.state;
    const profiles = companyProfiles.filter(p => p.uuid !== currentUser.id);

    return (
      <ProfilesSidebar
        loading={loading}
        error={error}
        profiles={profiles}
        retry={this.fetchProfiles} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesSidebarContainer);