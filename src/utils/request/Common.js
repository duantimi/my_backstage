import LocalStorageUtil from '../storage';
import axios from 'axios';

// axios全局配置
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10 * 60 * 1000; // 10分钟超时;

let token = LocalStorageUtil.getItem('token');
if (token && token.length) {
  axios.defaults.headers.CWAccessToken = token;
}

// 全局取消请求标识
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 实例化axios
const axiosInstance = axios.create();

// 注册拦截器
axios.interceptors.request.use(
  (config) => {
    // 全局添加cancelToken
    let newConfig = config;
    newConfig.cancelToken = source.token;
    return newConfig;
  },
  (err) => {
    const error = err;
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 取消所有请求
          source.cancel();
          // 清空本地缓存，然后退出
          localStorage.clear();
          window.location.hash = '/user/login';
          break;

        case 403:
          window.location.hash = '/';
          break;

        default:
          throw error;
      }
    }
  }
);

// axios发起请求
function axiosRequest(config, globalDomain = true) {
  return axiosInstance
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('请求过程错误:', error);
      }
      if (error.response) {
        let status = error.response.status;
        if (status == 400 || status == 500) {
          return {
            ...error.response.data,
            repStatus: status, // 增加http状态码，交由redux中间件拦截并统一处理error
          };
        }
      }

      if (__DEV__) {
        return {
          code: '100001', // 全局错误码
          msg: '请求过程发生错误,已经取消请求!',
          repStatus: 500,
        };
      }
    });
}

export default function (url, options) {
  let config = {
    url: url,
    ...options,
  };

  if (options && options.body) {
    config.data = options.body;
  }

  return axiosRequest(config, options.globalDomain);
}
