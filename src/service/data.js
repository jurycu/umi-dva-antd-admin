import request from './request';

//用户相关


export function getUsersSearch(searchPayload) {
  return request('/api/users/search', {
    method: 'POST',
    body: JSON.stringify(searchPayload),
  });
}



export function addUser(addPayload) {
  return request('/api/users/add', {
    method: 'POST',
    body: JSON.stringify(addPayload),
  });
}

export function deleteUser(empId) {
  return request('/api/users/delete' + empId, {
    method: 'DELETE',
    body: JSON.stringify(empId),
  });
}

export function updateUser(updatePayload) {
  return request('/api/users/update', {
    method: 'PUT',
    body: JSON.stringify(updatePayload),
  });
}

