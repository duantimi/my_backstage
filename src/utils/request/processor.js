/***
 * 将params转为 a=b&c=d 格式
 * @param params
 */
export function parseParamsToUrl(params) {
  let queryParam = null;
  if (params) {
    let keys = Object.keys(params);
    keys.forEach(function (key) {
      queryParam = queryParam ? queryParam + '&' + key + '=' + params[key] : key + '=' + params[key];
    });
  }
  return queryParam;
}
