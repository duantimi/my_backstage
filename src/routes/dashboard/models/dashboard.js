import { getListDataTestService } from '@/services/test';
export default {
  namespace: 'dashboard',
  state: {
    // Reducer
    test: 'Dva 数据流：dashboard/test',
    data: [],
    num: 1,
  },
  effects: {
    // saga
    *getData(action, { call, put }) {
      const data = yield call(getListDataTestService, {});
      yield put({
        type: 'setData',
        payload: data,
      });
    },
  },
  reducers: {
    // Action
    setNumAction(state, { payload }) {
      return {
        ...state,
        num: payload,
      };
    },
    setData(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
