import { fetch } from '../services/list';

export default {
  namespace: 'list',

  state: [],

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
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
