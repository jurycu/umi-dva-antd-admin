import React from 'react';
import {Modal, Radio} from 'antd';

const layout = {
  labelCol: {
    xs: {span: 34},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 34},
    sm: {span: 42},
  },
};

//TODO 默认选择的问题
const UserEditFormModal = ({edit_visible, record, onCancel, onEdit}) => {

  const [value, setValue] = React.useState("general");
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onOk = () => {
    record.role = value
    onEdit(record)

  }

  return (
    <Modal
      visible={edit_visible}
      title="分配角色"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      destroyOnClose
      onOk={onOk}
    >
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={"admin"}>管理员</Radio>
        <Radio value={"general"}>普通用户</Radio>
      </Radio.Group>
    </Modal>
  );
};
export default UserEditFormModal
