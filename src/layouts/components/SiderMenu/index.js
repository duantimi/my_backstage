import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

export default (props) =>
  props.isMobile ? (
    <Drawer
      visible={true}
      closable={false}
      placement="left"
      style={{ padding: 0 }}
      // onClose={() => { props.onCollapse(true); }}
    >
      <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  );
