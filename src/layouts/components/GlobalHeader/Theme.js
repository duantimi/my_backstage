import React, { Component } from 'react';
import { Modal } from 'antd';
import { getSeparatedStyles } from '@/utils/importTheme';
import themeIcon from '@/assets/theme.svg';
import styles from './index.less';
const themeColor = [
  { key: 'green', name: '绿色系', color: '#00C8BE' },
  { key: 'blue', name: '蓝色系', color: '#2592FF' },
  { key: 'cyan', name: '青色系', color: '#788AFF' },
];
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  switchTheme = (key) => {
    window.ENV.theme = key;
    this.setState(
      {
        visible: false,
      },
      () => {
        getSeparatedStyles();
      }
    );
  };

  render() {
    return (
      <div id="theme-box" className={styles.theme}>
        <img onClick={this.showModal} src={themeIcon} alt="" />
        <Modal
          title="主题"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          getContainer={() => document.querySelector('#theme-box')}
          footer={null}
        >
          {themeColor.map((item, index) => {
            return (
              <div className={styles.item} key={index} onClick={() => this.switchTheme(item.key)}>
                <div style={{ background: item.color }} />
                <p>{item.name}</p>
              </div>
            );
          })}
        </Modal>
      </div>
    );
  }
}

export default Theme;
