import request from "../service/request";

export function addRecord(addPayload) {
  return request('/v1/system/recordAdd', {
    method: 'POST',
    body: JSON.stringify(addPayload),
  });
}
