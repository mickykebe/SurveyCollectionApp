import React, { Component } from 'react';
import { profileFetchSuccess, showPopup } from '../actions';
import api from '../api';
import PopupSnackbar from '../components/PopupSnackbar';
import ProfileManageUser from '../components/ProfileManageUser';

const mapDispatchToProps = dispatch =>({
  profileFetched(response) {
    dispatch(profileFetchSuccess(response));
  },
  displayPopup(message) {
    dispatch(showPopup(message));
  }
})

class ProfileManageUserContainer extends Component {
  state = {
    activationInProgress: false,
    activationError: null,
  }

  changeActivation = (active) => {
    const { profile, profileFetched } = this.props;

    this.setState({ activationInProgress: true, activationError: null });
    const activationFn = active ? api.Profiles.activate : api.Profiles.deactivate;
    activationFn(profile.uuid)
      .then(response => {
        profileFetched(response);
        this.setState({ activationInProgress: false, activationError: null });
      })
      .catch(e => {
        this.setState({ activationInProgress: false, activationError: e });
      });
  }

  render() {
    const { profile } = this.props;
    const { activationInProgress, activationError } = this.state;
    return (
      <div>
        <ProfileManageUser
          profile={profile}
          activationInProgress={activationInProgress}
          onActivate={() => this.changeActivation(true)}
          onDeactivate={() => this.changeActivation(false)} />
        <PopupSnackbar
          show={!!activationError}
          message={!!activationError && "Problem occurred performing request"} />
      </div>
    );
  }
}

export default ProfileManageUserContainer;