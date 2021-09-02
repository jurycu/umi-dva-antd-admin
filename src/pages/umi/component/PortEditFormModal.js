import React from 'react';
import {Form, Input, InputNumber, Modal, Row,Col} from 'antd';
import { LimitTextArea } from 'antd-input'

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

const PortEditFormModal = ({edit_visible, record, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={edit_visible}
      title="编辑监控"
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      destroyOnClose
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        preserve={false}
      >

        <Form.Item
          name="monitor_name"
          label="监控项"
          initialValue={record.monitor_name}
          rules={[
            {
              required: true,
              message: '仅支持小写字母开头，支持中划线和点，不支持下划线等其他特殊字符!',
              pattern: new RegExp('^[a-z]+[a-z0-9-.]*$', 'g')
            },
          ]}
        >
          <Input disabled placeholder={"仅支持小写字母开头，支持中划线和点，不支持下划线等其他特殊字符!"}/>
        </Form.Item>
        <Form.Item
          name="ip"
          label="IP"
          initialValue={record.ip}
          rules={[
            {
              required: true,
              message: '多个IP隔行输入!不要有空格和其他字符！',
              pattern: new RegExp('^[0-9.\n]{1,}$','g')
            },
          ]}
        >
          <LimitTextArea maxLength={2000} placeholder={"多个IP隔行输入!不要有空格和其他字符！"}/>
        </Form.Item>

        <Form.Item
          name="port"
          label="Port"
          initialValue={record.port}
          rules={[
            {
              required: true,
              message: '多个端口隔行输入，不要有空格!',
              pattern: new RegExp('^[0-9\n]{1,}$','g')
            },
          ]}
        >
          <LimitTextArea maxLength={250} placeholder={"多个端口隔行输入，不要有空格!"}/>
        </Form.Item>
        <Form.Item
          name="interval_time"
          label="探测间隔(s)"
          initialValue={record.interval_time}
          rules={[
            {
              required: true,
              message: '请输入探测间隔，单位秒!',
              pattern: new RegExp('^[0-9]{1,}$','g'),
            },
          ]}
        >
          <InputNumber style={{width: 200}} placeholder={"请输入探测间隔，单位秒!"}  min={30}/>
        </Form.Item>

        <Form.Item
          name="remark"
          label="描述"
          initialValue={record.remark}
        >
          <Input.TextArea/>
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default PortEditFormModal
