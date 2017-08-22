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
  postResponse: (path, body) =>
    superagent.post(`${BASE_URL}${path}`, body).use(tokenPlugin),
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

export default {
  Auth,
  setToken: _token => { token = _token; }
};