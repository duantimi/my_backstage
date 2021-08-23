import { parseParamsToUrl } from '../utils/request/processor';
import API from './api';
import { get, post, del } from '../utils/request';

/**
 * 测试
 */
export function getListDataTestService(params = {}) {
  let url = API.GET_LIST_DATA_TEST;
  return post(url);
}
