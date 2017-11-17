import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
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

  fetchProfile = (props) => {
    const { match: { params: { profileId: id }}, profile, profileFetched } = props;

    if(!profile) {
      this.setState({ loading: true, error: false});
      api.Profiles.get(id)
        .then(response => {
          profileFetched(response);
          this.setState({ loading: false, error: false });
        })
        .catch(e => {
          this.setState({ loading: false, error: e });
        });
    }
  }

  componentDidMount() {
    this.fetchProfile(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.profileId !== nextProps.match.params.profileId) {
      this.setState({ loading: false, error: false });
      this.fetchProfile(nextProps);
    }
  }

  renderError = (error) => {
    if(error && error.response && error.response.status === 404) {
      return <OverlayError
        text="User not found" />
    }

    else {
      <OverlayError
        text="Problem occurred fetching profile"
        retry={this.fetchProfile} />
    }
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
            !!error &&
            this.renderError(error)
          }
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ProfileManageContainer);