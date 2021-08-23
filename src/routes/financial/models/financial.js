// import { getListDataTestService } from './../services/test';
export default {
  namespace: 'financial',
  state: {
    // Reducer
    test: 'Dva 数据流：dashboard/test',
    num: 1,
  },
  effects: {
    // saga
  },
  reducers: {
    // Action
    setNumAction(state, { payload }) {
      return {
        ...state,
        num: payload,
      };
    },
  },
};
