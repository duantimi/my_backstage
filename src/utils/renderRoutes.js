import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { toPeers, dynamicWrapper } from '@/utils/routerTool.js';
import localStorageUtil from '@/utils/storage';
import BaseLayout from '@/layouts/BasicLayout';
const RouteWithProps = ({ path = '/', exact = false, authority, render, ...rest }) => (
  <Route path={path} exact={exact} component={dynamicWrapper(render)} />
);

export default function renderRoutes({ routerData = [] }) {
  const currentUser = localStorageUtil.getItem('user');
  const routesr = routerData.filter((item) => item.title !== 'BasicLayout');
  const routes = toPeers(routesr);
  return routes ? (
    <Switch>
      {routes
        .filter(
          (item) =>
            !item.redirect && (item.authority ? item.authority.includes(currentUser ? currentUser.userName : '') : true)
        )
        .map((route, i) => {
          const RouteRoute = RouteWithProps;
          return (
            route.component && (
              <RouteRoute key={route.key || i} path={route.path} exact={route.exact} render={route.component} />
            )
          );
        })}
      {routes
        .filter((item) => item.redirect)
        .map((route, i) => {
          if (route.redirect) {
            return (
              <Redirect
                key={route.key || i}
                from={route.path}
                to={route.redirect}
                exact={route.exact === false ? false : true}
                strict={route.strict}
              />
            );
          }
        })}
      <Route render={(props) => <BaseLayout routerData={routerData} {...props} />} />
    </Switch>
  ) : null;
}
