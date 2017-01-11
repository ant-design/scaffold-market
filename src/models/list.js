import { fetch } from '../services/list';

export default {

  namespace: 'list',

  state: [],

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetch);
      yield put({ type: 'save', payload: data });
    },
  },

  reducers: {
    save(state, { payload }) {
      return payload.list;
    },
  },

};
