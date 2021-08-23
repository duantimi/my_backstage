// import { getListDataTestService } from './../services/test';
export default {
  namespace: 'topology',
  state: {
    // Reducer
    test: 'Dva topology/test',
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
