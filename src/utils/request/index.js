import CommonRequest from './Common';

export function post(url, options) {
  return CommonRequest(url, { method: 'post', ...options });
}

export function get(url, options) {
  return CommonRequest(url, { method: 'get', ...options });
}

export function put(url, options) {
  return CommonRequest(url, { method: 'put', ...options });
}

export function del(url, options) {
  return CommonRequest(url, { method: 'delete', ...options });
}

export function upload(url, options) {
  return CommonRequest(url, { method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, ...options });
}
