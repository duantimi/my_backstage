import React, { Component, useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import config from '$config/router.config.js';
import style from './index.less';
import { flattening } from '$utils/tool';

function BreadCrumbComponent(props) {
  // 定义接收到的路由及路由配置
  const [crumb, setCrumb] = useState([]);
  const [configData, setConfigData] = useState(flattening(config, 'routes'));

  useEffect(() => {
    const { pathname = '' } = props.location;
    // 将当前路由路径分割为数组
    const urlAddress = pathname.split('/').filter((item) => item);
    let strUrl = [];
    let names = '';
    // 进行魂环拼接得到最终当前路径及Name
    urlAddress &&
      urlAddress.forEach((item) => {
        const _item = (names += '/' + item);
        // console.log(_item);
        const pathName = configData.filter((items) => items.path == `${_item}`)[0];
        strUrl.push({
          name: `${pathName ? pathName.name : _item}`,
          path: `${_item}`,
        });
      });
    // 改变crumb值输出
    setCrumb(strUrl);
    //
  }, [props.location.pathname]);

  return (
    <Breadcrumb>
      {
        // 将最终数组渲染到面包屑
        crumb.map((item, i) => {
          // console.log(item.name);
          return (
            <Breadcrumb.Item key={i}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </Breadcrumb.Item>
          );
        })
      }
    </Breadcrumb>
  );
}
export default BreadCrumbComponent;

// export default class BreadcrumbComp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             configData: flattening(config, 'routes')
//         };
//     }

//     getBreadLineDom = () => {
//         const { configData = [] } = this.state;
//         const { pathname = '' } = this.props.location;
//         const urlAddress = pathname.split('/').filter(item => item);
//         let strUrl = [];
//         let names = '';
//         urlAddress && urlAddress.forEach(item => {
//             const _item = names += '/' + item;
//             // const pathName = configData.filter(items => items.path == `${item}`)[0];
//             const pathName = configData.filter(items => items.path == `${_item}`)[0];
//             strUrl.push({
//                 'name':`${pathName ? pathName.name : _item}`,
//                 'path':`${_item}`,
//             });
//         });

//         return strUrl;
//     }

//     render() {
//         const crumb = this.getBreadLineDom();
//         return (
//             <Breadcrumb >
//                 {
//                     crumb.map((item, i)=>{
//                         return <Breadcrumb.Item key={i}>
//                             <NavLink to={item.path}>{item.name}</NavLink>
//                         </Breadcrumb.Item>;
//                     })
//                 }
//             </Breadcrumb>

//         );
//     }
// }

// export default BreadcrumbComp;
