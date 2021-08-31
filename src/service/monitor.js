import request from '../service/request';

/**
 * 获取菜单数据
 * @param searchName
 */
export function getMonitorPort(searchName) {
  return request('/v1/monitor/portList', {
    method: 'POST',
    body: JSON.stringify(searchName),
  });
}

export function delPort(delName) {
  return request('/v1/monitor/portDel', {
    method: 'DELETE',
    body: JSON.stringify(delName),
  });
}

export function addPort(addPayload) {
  return request('/v1/monitor/portAdd', {
    method: 'POST',
    body: JSON.stringify(addPayload),
  });
}

export function updatePort(updatePayload) {
  return request('/v1/monitor/portUpdate', {
    method: 'PUT',
    body: JSON.stringify(updatePayload),
  });
}
