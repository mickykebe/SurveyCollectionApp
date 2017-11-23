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
  memberRegister: (user) =>
    superagent.post(`${BASE_URL}/profiles/`, user).then(responseBody).then(data => mapper.register(data)),
  adminRegister: (company) =>
    superagent.post(`${BASE_URL}/companies/`, company).then(responseBody).then(data => mapper.adminRegister(data)),
}

const Surveys = {
  mine(offset = 0) {
    return requests.get(`/surveys/mine/?offset=${offset}`)
      .then(data => mapper.surveyFeed(data));
  },
  get(id) {
    return requests.get(`/surveys/${id}/`);
  },
  create(survey) {
    return requests.post('/surveys/', survey);
  },
  update(survey) {
    return requests.put(`/surveys/${survey.uuid}/`, survey);
  },
  delete(id) {
    return requests.del(`/surveys/${id}/`);
  }
}

const SurveyResponses = {
  all(id, offset = 0) {
    return requests.get(`/surveys/${id}/filled-surveys/?offset=${offset}`)
      .then(data => mapper.surveyResponses(data));
  },
  allFormat(id, format = 'csv') {
    return superagent.get(`${BASE_URL}/surveys/${id}/export/?format=${format}`).use(tokenPlugin).responseType('blob').then(responseBody);
  }
}

const Languages = {
  all() {
    return requests.get('/languages/?limit=0');
  },
  create(language) {
    return requests.post('/languages/', language);
  },
  update(language) {
    return requests.put(`/languages/${language.uuid}/`, language);
  },
  delete(id) {
    return requests.del(`/languages/${id}/`);
  }
}

const Companies = {
  all() {
    return superagent.get(`${BASE_URL}/companies/?limit=0`).then(responseBody);
  },
  /* create(company) {
    return requests.post('/companies/', company).then((data) => mapper.register(data));
  } */
}

const Profiles = {
  all(companyId) {
    return requests.get(`/profiles/?query={"company__uuid":"${companyId}"}&limit=0`);
  },
  get(id) {
    return requests.get(`/profiles/${id}/`);
  },
  activate(id) {
    return requests.get(`/profiles/${id}/activate/`);
  },
  deactivate(id) {
    return requests.get(`/profiles/${id}/deactivate/`);
  }
}

export default {
  Auth,
  Surveys,
  SurveyResponses,
  Languages,
  Companies,
  Profiles,
  setToken: _token => { token = _token; }
};