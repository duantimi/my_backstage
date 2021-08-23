import React, { Component } from 'react';
import images from './assets/路由.jpg';
import style from './assets/style.less';
export default class index extends Component {
  render() {
    return (
      <div>
        <h1 className={style.h1}>React + Dva + Css Module</h1>
        <img src={images} alt="" width="100%" />
      </div>
    );
  }
}
