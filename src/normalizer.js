const current = (data) => ({
  user: {
    id: data.uuid,
    ...(data.user),
  }
});

const login = (data) => ({
  user: {
    id: data.profile.uuid,
    token: data.token,
    ...(data.profile.user),
  }
});

const register = (data) => ({
  user: {
    id: data.uuid,
    token: data.token,
    ...(data.user)
  }
});

export default {
  current,
  login,
  register,
}