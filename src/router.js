import React from 'react';
import { router } from 'dva';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import AuthorizedRoute from './AuthorizedRoute';
import routerData from '$config/router.config';

const { Router, Switch } = router;
const RouterConfig = ({ history }) => (
  <ConfigProvider locale={zhCN}>
    <div className="global-wrapper" style={{ height: '100vh' }}>
      <Router history={history}>
        <Switch>
          <AuthorizedRoute routerData={routerData} />
        </Switch>
      </Router>
    </div>
  </ConfigProvider>
);

export default RouterConfig;
