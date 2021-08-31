import React from 'react';
import {Form, Input, Modal, Radio, Select, Space} from 'antd';
import * as users from "../../../service/data";
import Image from "antd/es/image";

const {Option} = Select;

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


const UserCreateFormModal = ({visible, onCancel, onCreate}) => {

  const [form] = Form.useForm();
  // const onGenderChange = (value) => {
  //   console.log(value)
  //   form.setFieldsValue({ role: value });
  // };
  const [value, setValue] = React.useState("general");
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    form.setFieldsValue({role: e.target.value});
  };

  return (
    <Modal
      visible={visible}
      title="创建用户"
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

        <Form.Item name="name" label="姓名"
                   rules={[
                     {
                       required: true,
                     },
                   ]}
        >
          <Input placeholder={"姓名"}/>
        </Form.Item>

        <Form.Item name="empId" label="工号"
                   rules={[
                     {
                       required: true,
                     },
                   ]}
        >
          <Input placeholder={"工号"}/>
        </Form.Item>

        <Form.Item name="dep" label="部门"
                   rules={[
                     {
                       required: true,
                     },
                   ]}
        >
          <Input placeholder={"部门"}/>
        </Form.Item>

        <Form.Item name="role" label="角色"
                   rules={[
                     {
                       required: true,
                     },
                   ]}
        >
          {/*<Select defaultValue="general" style={{ width: 120 }} onChange={onGenderChange} >*/}
          {/*  <Option value="general">普通用户</Option>*/}
          {/*  <Option value="admin">管理员</Option>*/}
          {/*</Select>*/}
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={"admin"}>管理员</Radio>
            <Radio value={"general"}>普通用户</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UserCreateFormModal
