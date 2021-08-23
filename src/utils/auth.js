import { router } from 'dva';
import localStorageUtil from './storage';
const { routerRedux } = router;

export const onError = (e, dispatch) => {
  if (e.name === 401 || e.name === 403) {
    dispatch(routerRedux.push('/exception/403'));
    return;
  }
  if (e.name <= 504 && e.name >= 500) {
    dispatch(routerRedux.push('/exception/500'));
    return;
  }
  if (e.name >= 404 && e.name < 422) {
    dispatch(routerRedux.push('/exception/404'));
  }
};

export const checkLogin = () => {
  const user = localStorageUtil.getItem('user');
  //如果有用户信息，则直接登录
  if (user && user.userId && user.userName) {
    return true;
  }

  return false;
};

export const logout = () => {
  localStorageUtil.clearItem('user');
};
