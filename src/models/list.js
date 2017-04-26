import Github from 'github-api';
import { fetch } from '../services/list';
import { parseGithubUrl } from '../utils/github';

export default {
  namespace: 'list',

  state: [],

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { auth, list } = yield select();
      const { data } = yield call(fetch);
      const newList = [...data.list];

      for (let i = 0; i < newList.length; i += 1) {
        let newData;
        if (!payload || newList[i].name === payload) {
          const { git_url } = newList[i];
          const { user, repo } = parseGithubUrl(git_url);
          const { accessToken } = auth;
          const github = new Github({ token: accessToken });
          // read basic information of repo
          const repos = yield github.getRepo(user, repo);
          const response = yield repos.getDetails();
          newData = response.data;
        }
        newList[i] = {
          ...list.filter(item => item.name === newList[i].name)[0],
          ...newData,
          ...newList[i],
        };
      }

      yield put({
        type: 'save',
        payload: newList,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return [...payload];
    },
  },
};
