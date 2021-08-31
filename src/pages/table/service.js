// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取规则列表 GET /api/rule */
export async function rule(params, options) {
  return request('/api/rule', Object.assign({ method: 'GET', params: Object.assign({}, params) }, (options || {})));
}
/** 新建规则 PUT /api/rule */
export async function updateRule(options) {
  return request('/api/rule', Object.assign({ method: 'PUT' }, (options || {})));
}
/** 新建规则 POST /api/rule */
export async function addRule(options) {
  return request('/api/rule', Object.assign({ method: 'POST' }, (options || {})));
}
/** 删除规则 DELETE /api/rule */
export async function removeRule(options) {
  return request('/api/rule', Object.assign({ method: 'DELETE' }, (options || {})));
}
