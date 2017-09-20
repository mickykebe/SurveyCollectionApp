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
    ...(data.user)
  }
});

const pagination = (data) => {
  const { next: nextUrl, ...rest } = data;

  if(!nextUrl) {
    return rest;
  }
  const match = nextUrl.match(/offset=(\d+)/);
  if(match === null || match[1] === undefined) {
    return rest;
  }
  return {
    next: Number(match[1]),
    ...rest,
  };
}

const surveyFeed = (data) => {
  return pagination(data);
}

const surveyResponses = (data) => {
  return pagination(data);
}

export default {
  current,
  login,
  register,
  surveyFeed,
  surveyResponses,
}