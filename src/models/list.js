import Github from 'github-api';
import { fetch } from '../services/list';
import { parseGithubUrl } from '../utils/github';

export default {
  namespace: 'list',

  state: [],

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { data: { list } } = yield call(fetch);

      for (let i = 0; i < list.length; i += 1) {
        const { git_url } = list[i];
        const { user, repo } = parseGithubUrl(git_url);
        const { auth } = yield select();
        const { accessToken } = auth;
        const github = new Github({ token: accessToken });
        // read basic information of repo
        const repos = yield github.getRepo(user, repo);
        const response = yield repos.getDetails();
        list[i] = {
          ...list[i],
          gitInfo: response.data,
        };
      }

      yield put({ type: 'save', payload: list });
    },
  },

  reducers: {
    save(state, { payload }) {
      return [...payload];
    },
  },
};
