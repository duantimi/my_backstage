import React, { PureComponent } from 'react';
import { router } from 'dva';
import { Layout, Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import Theme from './Theme';
import styles from './index.less';
const { Link } = router;
const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  };

  render() {
    const { currentUser = {}, collapsed, onMenuClick, isMobile } = this.props;
    const { userName = 'tiger.wang', avatar = '' } = currentUser;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
        <div className={styles.right}>
          <Theme />
          {userName ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} icon="user" src={avatar} />
                <span className={styles.name}>{userName}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </Header>
    );
  }
}
