const current = (data) => ({
  user: {
    id: data.uuid,
    ...(data.user),
  }
});

const login = (data) => {
  const { uuid: id, user, ...rest} = data.profile;
  return {
    user: {
      id,
      ...user,
      ...rest,
    }
  }
};

const register = (data) => ({
  user: {
    id: data.uuid,
    ...(data.user)
  }
});

const adminRegister = (data) => {
  const { admin, ...company } = data;
  const { uuid: id, user, ...restAdmin } = admin;
  return {
    user: {
      id,
      ...user,
      ...restAdmin,
    },
    company,
  };
}

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
  adminRegister,
  surveyFeed,
  surveyResponses,
}