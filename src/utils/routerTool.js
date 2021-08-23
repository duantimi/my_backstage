import React, { createElement } from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

/**
 * toPeers 多重数组拉平
 * @param {array} array
 */
export const toPeers = (array, path = '') => {
  let enwArrAy = [];
  array.map((item) => {
    !item.routes && enwArrAy.push({ ...item, path: path + item.path, routes: null });
    if (item.routes && item.routes.length) {
      enwArrAy = enwArrAy.concat(toPeers(item.routes, path + item.path));
    }
  });
  return enwArrAy;
};

//动态包装路由组件
export const dynamicWrapper = (component) => {
  return Loadable({
    loader: () => {
      return component.then((raw) => {
        const Component = raw.default || raw;
        return (props) => createElement(Component, { ...props });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};
