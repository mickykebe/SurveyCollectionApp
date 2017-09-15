import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import mapper from './mapper';

const superagent = superagentPromise(_superagent, global.Promise);

const BASE_URL = 'http://collect.ahadootec.info';

let token = null;
const responseBody = res => res.body;
const tokenPlugin = req => {
  if(token) {
    req.set('authorization', `JWT ${token}`);
  }
}

const requests = {
  get: path =>
    superagent.get(`${BASE_URL}${path}`).use(tokenPlugin).then(responseBody),
  post: (path, body) =>
    superagent.post(`${BASE_URL}${path}`, body).use(tokenPlugin).then(responseBody),
  put: (path, body) =>
    superagent.put(`${BASE_URL}${path}`, body).use(tokenPlugin).then(responseBody),
  del: (path) =>
    superagent.del(`${BASE_URL}${path}`).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/profiles/me/').then((data) => mapper.current(data)),
  login: (username, password) =>
    requests.post('/api-token-auth/', { username, password }).then((data) => mapper.login(data)),
  register: (username, first_name, last_name, email, password, confirm_password) =>
    superagent.post(`${BASE_URL}/profiles/`, {
      user: {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password
      }
    }).use(tokenPlugin).then(res => {
      return mapper.register(res.body);
    }),
}

const Surveys = {
  mine() {
    return requests.get('/surveys/mine/');
  },
  get(id) {
    return requests.get(`/surveys/${id}/`);
  },
  create(survey) {
    return requests.post('/surveys/', { ...survey });
  },
  update(survey) {
    return requests.put(`/surveys/${survey.uuid}/`, { ...survey });
  },
  delete(id) {
    return requests.del(`/surveys/${id}/`);
  }
}

const SurveyResponses = {
  all(id) {
    return requests.get(`/surveys/${id}/filled-surveys/`);
  }
}

export default {
  Auth,
  Surveys,
  SurveyResponses,
  setToken: _token => { token = _token; }
};