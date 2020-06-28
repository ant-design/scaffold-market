import Github from 'github-api';
import store from 'store';
import firebase from '../utils/firebase';

export default {
  namespace: 'auth',

  state: {
    credential: null,
    user: null,
    accessToken: store.get('accessToken') || null,
  },

  subscriptions: {
    setup({ dispatch }) {
      if (store.get('accessToken')) {
        dispatch({ type: 'github', payload: store.get('accessToken') });
      }
    },
  },

  effects: {
    *login(_, { put }) {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('public_repo');
      const authResult = yield firebase.auth().signInWithPopup(provider);
      yield put({ type: 'github', payload: authResult.credential.accessToken });
    },
    *github({ payload }, { put }) {
      yield put({ type: 'startLogin' });
      const github = new Github({
        token: payload,
      });
      const user = yield github.getUser();
      const profile = yield user.getProfile();
      if (profile && profile.data) {
        yield put({
          type: 'save',
          payload: {
            user: profile.data,
            accessToken: payload,
          },
        });
        store.set('accessToken', payload);
      }
    },
  },

  reducers: {
    startLogin: state => ({
      ...state,
      user: {
        logining: true,
      },
    }),
    save: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};

// b6b22ca4475ff538f9ba2331139e4e1e542c7686
