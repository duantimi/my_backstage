import dva from 'dva';
import router from './router';
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading';
import { onError } from './utils/auth';
import { init } from '@/utils/importTheme';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const app = dva({
  onError,
  history: BASEPATH && createHistory(),
});

app.use(createLoading());

require('./models').default.forEach((key) => {
  if (key && key.default && key.default.namespace && key.default.namespace && key.default.state) {
    app.model(key.default);
  }
});

init(() => {
  app.router(router);
  app.start('#root');
});
