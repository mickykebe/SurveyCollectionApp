import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { profileFetchSuccess } from '../actions';
import api from '../api';
import OverlayLoading from '../components/OverlayLoading';
import OverlayError from '../components/OverlayError';
import ProfileManage from '../components/ProfileManage';
import { getProfile } from '../reducers';

const styles = theme => ({
  root: {
    position: 'relative',
    flex: 1,
  }
});

const mapStateToProps = (state, ownProps) => 
  console.log(ownProps.match.params.profileId) ||
  console.log(getProfile(state, ownProps.match.params.profileId)) ||
  ({
    profile: getProfile(state, ownProps.match.params.profileId),
  });

const mapDispatchToProps = (dispatch) => ({
  profileFetched(response) {
    dispatch(profileFetchSuccess(response));
  }
})

class ProfileManageContainer extends Component {
  state = {
    loading: false,
    error: false,
  }

  fetchProfile = () => {
    const { match: { params: { profileId: id }}, profile, profileFetched } = this.props;

    if(!profile) {
      this.setState({ loading: true, error: false});
      api.Profiles.get(id)
        .then(response => {
          profileFetched(response);
          this.setState({ loading: false, error: false });
        })
        .catch(() => {
          this.setState({ loading: false, error: true });
        });
    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    const { classes, profile } = this.props;
    const { loading, error } = this.state;

    return (
      <div className={classes.root}>
        {
          !!profile &&
          <ProfileManage
            profile={profile} />
        }
        {
          loading &&
          <OverlayLoading />
        }
        {
          error &&
          <OverlayError
            text="Problem occurred fetching profile"
            retry={this.fetchProfile} />
        }
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ProfileManageContainer);