import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import img_404 from './img/404.svg';
import img_403 from './img/403.svg';
import img_500 from './img/500.svg';

const config = {
  403: {
    img: img_403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: img_404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: img_500,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default ({ className = '', linkElement = 'a', type, title, desc, img, ...rest }) => {
  const pageType = type in config ? type : '404';
  return (
    <div className="exception">
      <Result
        icon={<img src={config[pageType].img} />}
        title={config[pageType].title}
        subTitle={config[pageType].desc}
        extra={
          <Button type="primary">
            <Link to="/">返回首页</Link>
          </Button>
        }
      />
    </div>
  );
};
