import React from 'react';
import { router } from 'dva';
import { checkLogin } from '@/utils/auth';
import RenderRoutes from '@/utils/renderRoutes';
import Login from '@/layouts/UserLayout';
import './assets/reset.less';
class AuthorizedRouteComp extends React.Component {
  render() {
    const checkLoginResult = checkLogin();
    return checkLoginResult ? (
      RenderRoutes(this.props)
    ) : (
      <>
        <router.Route path="/user/login" component={Login} />
        <router.Redirect to="/user/login" />
      </>
    );
  }
}
export default AuthorizedRouteComp;
