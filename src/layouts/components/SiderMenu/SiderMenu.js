import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { router } from 'dva';
import styles from './index.less';
import { layoutConf } from '@/globalConstants/index';
const { Link } = router;

const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    const { routes = [] } = props.menuData ? props.menuData.filter((item) => item.title === 'BasicLayout')[0] : [];
    this.menus = routes;
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.location.pathname !== this.props.location.pathname) {
  //         this.setState({
  //             openKeys: this.getDefaultCollapsedSubMenus(nextProps),
  //         });
  //     }
  // }

  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props;
    const snippets = pathname.split('/').slice(1, -1);
    const currentPathSnippets = snippets.map((item, index) => {
      const arr = snippets.filter((_, i) => i <= index);
      return arr.join('/');
    });
    let currentMenuSelectedKeys = [];
    currentPathSnippets.forEach((item) => {
      currentMenuSelectedKeys = currentMenuSelectedKeys.concat(this.getSelectedMenuKeys(item));
    });
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      const path = (item.path || '').replace(/\//g, '');
      if (item.routes) {
        item.title && keys.push(path);
        keys = keys.concat(this.getFlatMenuKeys(item.routes));
      } else {
        item.title && keys.push(path);
      }
    });
    return keys;
  }

  getSelectedMenuKeys = (path = '') => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    if (flatMenuKeys.indexOf(path.replace(/^\//, '')) > -1) {
      return [path.replace(/^\//, '')];
    }
    if (flatMenuKeys.indexOf(path.replace(/^\//, '').replace(/\/$/, '')) > -1) {
      return [path.replace(/^\//, '').replace(/\/$/, '')];
    }
    return flatMenuKeys.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      return itemRegExp.test(path.replace(/^\//, '').replace(/\/$/, ''));
    });
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, title } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{title}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        // onClick={this.props.isMobile ? () => { this.props.onCollapse(true); } : undefined}
      >
        {icon}
        <span>{title}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    const { pathname = '' } = this.props.location || {};
    if (item.routes && item.routes.some((child) => child.title)) {
      return (
        <SubMenu
          className={pathname.includes(item.path) ? 'ant-menu-active' : ''}
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.title}</span>
              </span>
            ) : (
              item.title
            )
          }
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.routes, item.path)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item className={item.path == pathname ? 'ant-menu-item-actives' : ''} key={item.key || item.path}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, path = '') => {
    const { currentUser = '' } = this.props;
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(
        (item) =>
          item.title &&
          !item.hideInMenu &&
          (item.authority ? item.authority.includes(currentUser ? currentUser.userName : '') : true)
      )
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem({
          ...item,
          path: path + item.path,
        });
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => !!item);
  };

  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      (item) => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  };

  render() {
    const {
      logo,
      collapsed,
      location: { pathname },
      onCollapse,
    } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={onCollapse}
        width={layoutConf.siderWidth}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>name</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}
