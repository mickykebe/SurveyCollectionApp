import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentUser } from '../reducers';
import ProfilesSidebar from '../components/ProfilesSidebar';
import api from '../api';
import { profilesFetchSuccess } from '../actions';

const mapStateToProps = (state) => ({
  profiles: getProfiles(state),
  currentUser: getCurrentUser(state),
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

  fetchProfiles = () => {
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