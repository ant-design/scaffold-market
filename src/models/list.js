import Github from 'github-api';
import { fetch, fetchReadme } from '../services/list';
import { parseGithubUrl } from '../utils/github';

export default {
  namespace: 'scaffold',

  state: {
    list: [],
    sortWay: 'starCount',
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { auth, scaffold: { list } } = yield select();
      let newList;
      if (payload && list.length > 0) {
        newList = [...list];
      } else {
        const { data } = yield call(fetch);
        newList = [...data.list];
      }
      const results = [];
      const readmes = [];
      for (let i = 0; i < newList.length; i += 1) {
        if (!payload || newList[i].name === payload) {
          const { git_url } = newList[i];
          const { user, repo } = parseGithubUrl(git_url);
          const { accessToken } = auth;
          const github = new Github({ token: accessToken });
          // read basic information of repo
          const repoData = yield github.getRepo(user, repo);
          results.push(repoData.getDetails());

          if (payload) {
            readmes.push(fetchReadme(user, repo));
          }
        }
      }

      const [newDatas, newReadmes] = yield [Promise.all(results), Promise.all(readmes)];

      for (let i = 0; i < newDatas.length; i += 1) {
        const target = newList.filter(item => item.git_url === newDatas[i].data.git_url)[0];
        if (target) {
          newList[i] = {
            ...newDatas[i].data,
            ...target,
            readme: newReadmes[i].data,
          };
        }
      }

      yield put({
        type: 'save',
        payload: newList,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: [...payload],
      };
    },
    changeSortWay(state, { payload }) {
      return {
        ...state,
        sortWay: payload,
      };
    },
  },
};
