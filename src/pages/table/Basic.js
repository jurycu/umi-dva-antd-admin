import React from 'react';
import {Button, Col, Divider, Image, Input,notification, Popconfirm, message,Row, Space, Table} from 'antd';
import Cookies from "js-cookie";
import * as users from "../../service/umi-request"
import UserEditFormModal from "./component/UserEditForm";
import UserCreateFormModal from "./component/UserAddForm";
import {sleep} from "../utils";

//TODO 错误显示
const {Search} = Input;

class Basic extends React.Component {
  state = {
    visible: false, // 弹框默认隐藏
    edit_visible: false,
    record: {},
    loading: false,
    usersList: []
  }

  componentDidMount() {
    this.onSearch("").then()
  }
  //编辑
  onEdit = record => () => {
    this.setState({edit_visible: true, record});

  }
  //创建按钮弹窗
  onCreateModal = () => {
    this.setState({visible: true});
  }

  // 删除
  del = empId => async () => {
    this.setState({loading: true})
    const puzzle = await users.deleteUser(empId)
    if (puzzle.success) {
      this.setState({loading: false})
      message.success("删除角色成功！", 3)
    } else {
      this.setState({loading: false})
      notification.error({
        message: '接口报错',
        duration: null,
        description:
        "删除错误",
      });
    }
    sleep(50)
    this.onSearch("").then(r => r)

  }

  //直接请求service创建
  onAddUser = async (record) => {
    const res = await users.addUser(record);
    if (res.success) {
      message.success("创建用户成功！", 2)
      this.setState({visible: false});
      this.onSearch("").then(r => r)
    }else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "添加失败",
      });
    }
  }

  onEditUser = async (record) => {
    record.empId = record.empId.toString()
    const res = await users.updateUser(record);
    if (res) {
      message.success("分配角色成功！", 2)
      this.setState({edit_visible: false});
      this.onSearch("").then(r => r)
    }else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "分配角色失败",
      });
    }
  }

  onSearch =  async (value) => {
    const puzzle = await users.getUsersSearch({"searchName": value})
     console.log(puzzle)
    // if (puzzle.code === 200){
    //   this.setState({loading: false, usersList: puzzle.data})
    // }
    if (puzzle.success) {
      const usersList = []
      for (let user of puzzle.data) {
        if (user.role === "admin") {
          user.role = "管理员"
        } else if (user.role === "general") {
          user.role = "普通用户"
        } else {
          user.role = "非法用户"
        }
        usersList.push(user)
      }
      this.setState({loading: false, usersList: usersList})
    } else {
      this.setState({loading: false})
      notification.error({
        message: '接口报错',
        duration: null,
        description:
        "搜索报错",
      });
    }

  }

  // 子组件取消调用的
  cancelModal = () => {
    this.setState({visible: false, edit_visible: false});
  }

  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  render() {
    const role = Cookies.get("UserRole")
    const {visible, edit_visible, record} = this.state;
    const columns = [
      {
        title: '工号',
        dataIndex: 'empId',
      },

      {
        title: '姓名',
        dataIndex: 'name',
        align: "center",
        render: (text, record) => {
          return (
            <div>
              <Image
                width={30}
                style={{borderRadius: '50%'}}
                src={"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"}
              />
              <span style={{position: 'relative', left: '10px', top: '-9px'}}>{text}</span>
            </div>

          )
        }
      },

      {
        title: '角色',
        dataIndex: 'role',
        align: "center",
      },
      {
        align: "center",
        title: '部门',
        dataIndex: 'dep',
        width: 500
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: "center",
        render: (text, record) => {
          return (
            <div>
              <Button type='primary' onClick={this.onEdit(record)}>分配角色</Button>
              <Divider type="vertical"/>
              <Popconfirm title="确定删除吗？" onConfirm={this.del(record.empId)} okText="确定" cancelText="取消">
                <Button danger type='primary' href="#">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    return (
      <div style={{padding: 24, background: '#fff', minHeight: 660}}>
        <Row>
          {/*输入框内容变化时实时搜索*/}
          <Col span={4}><Search placeholder="请输入关键字" onSearch={this.onSearch} allowClear={true} enterButton/></Col>
          <Col span={1} offset={19}>
            <Space size={4}>
              <Button
                type='primary'
                onClick={this.onCreateModal}
              >添加</Button>
            </Space>
          </Col>
        </Row>
        <br/>
        <br/>
        <Table columns={columns} dataSource={this.state.usersList} loading={this.state.loading}
               onChange={this.onChange}
               rowKey="empId">
        </Table>
        <UserEditFormModal edit_visible={edit_visible} record={record} onCancel={this.cancelModal}
                           onEdit={this.onEditUser}/>
        <UserCreateFormModal visible={visible} onCancel={this.cancelModal} onCreate={this.onAddUser}/>
      </div>
    );
  }
}

export default Basic;
