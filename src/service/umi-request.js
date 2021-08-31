import request from '../utils/umi-request';

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}

export function getUsersSearch(searchPayload) {
  return request('/api/users/search', {
    method: 'POST',
    data: searchPayload,
  });
}



export function addUser(addPayload) {
  return request('/api/users/add', {
    method: 'POST',
    data: addPayload,
  });
}

export function deleteUser(empId) {
  console.log(empId)
  return request('/api/users/delete', {
    method: 'DELETE',
    data: {"empId":empId},
  });
}

export function updateUser(record) {
  return request('/api/users/update', {
    method: 'PUT',
    data: record,
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function getDnsRecord(params) {
  return request('/v1/getDomainRecord', {
    params,
  });
}

export async function getTyjrBilling(params) {
  return request('/v1/sls/GetTyjrBillingList', {
    params,
  });
}


export function deleteDomain(deletePayload) {
  return request('/v1/deleteDomain/', {
    method: 'DELETE',
    data: JSON.stringify(deletePayload),
  });
}

