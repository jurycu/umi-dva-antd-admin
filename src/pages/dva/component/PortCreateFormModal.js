import React from 'react';
import {Form, Input, InputNumber, Modal} from 'antd';
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

const PortCreateFormModal = ({visible, onCreate, onCancel}) => {

  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建监控"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      destroyOnClose
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        preserve={false}
        form={form}
        {...layout}
      >
        <Form.Item
          name="monitor_name"
          label="监控项"
          rules={[
            {
              required: true,
              message: '仅支持小写字母开头，支持中划线和点，不支持下划线等其他特殊字符!',
              pattern: new RegExp('^[a-z]+[a-z0-9-.]*$', 'g')
            },
          ]}
        >
          <Input placeholder={"仅支持小写字母开头，支持中划线和点，不支持下划线等其他特殊字符!"}/>
        </Form.Item>
        <Form.Item name="ip" label="IP"
                   rules={[
                     {
                       required: true,
                       message: '多个IP隔行输入!不要有空格！',
                       pattern: new RegExp('^[0-9.\n]{1,}$','g')
                     },
                   ]}
        >
          <LimitTextArea maxLength={2000} placeholder={"多个IP隔行输入!不要有空格！"}/>
        </Form.Item>
        <Form.Item name="port" label="Port"
                   rules={[
                     {
                       required: true,
                       message: '多个端口隔行输入，不要有空格!',
                       pattern: new RegExp('^[0-9\n]{1,}$','g')
                     },
                   ]}
        >
          <LimitTextArea maxLength={250} placeholder={"多个端口隔行输入，不要有空格"}/>
        </Form.Item>

        <Form.Item name="interval_time" label="探测间隔(s)" initialValue={"300"}
                   rules={[
                     {
                       required: true,
                       message: '请输入探测间隔，单位秒!',
                       pattern: new RegExp('^[0-9]{1,}$','g')
                     },
                   ]}
        >
          <InputNumber style={{width: 200}} defaultValue="300" placeholder={"请输入探测间隔，单位秒!"} min={30} />
        </Form.Item>

        <Form.Item name="remark" label="描述">
          <Input.TextArea/>
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default PortCreateFormModal
