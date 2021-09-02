import request from '../utils/umi-request';

/**
 * 获取菜单数据
 * @param searchPayload
 */
export function getMonitorPort(searchPayload) {
  return request('/api/monitor/search', {
    method: 'POST',
    data: searchPayload,
  });
}

export function delPort(delName) {
  console.log(delName)
  return request('/api/monitor/delete', {
    method: 'DELETE',
    data: delName,
  });
}

export function addPort(addPayload) {
  return request('/api/monitor/add', {
    method: 'POST',
    data: addPayload,
  });
}

export function updatePort(updatePayload) {
  return request('/api/monitor/update', {
    method: 'PUT',
    data: updatePayload,
  });
}
