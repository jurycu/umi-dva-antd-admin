import React from 'react';
import {
  Button,
  Col,
  Divider,
  Input,
  message,
  notification,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Typography
} from 'antd';
import {connect} from 'dva';
import PortCreateFormModal from './component/PortCreateFormModal'
import PortEditFormModal from './component/PortEditFormModal'
import * as monitorPort from '../../service/monitor'
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {createFromIconfontCN} from "@ant-design/icons";

const {Title} = Typography;
//TODO 错误显示
const namespace = 'monitorPort';
const {Search} = Input;
const {Paragraph} = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2629363_en7b9ky7d7m.js'
  ],
});


class List extends React.Component {
  state = {
    visible: false, // 弹框默认隐藏
    record: {},
    selectedRowKeys: [],
    portList: [],
    search: false,
    loading: false,
    edit_visible: false //编辑弹窗默认隐藏
  }

  componentDidMount() {
    this.onSearch("");
  }

  //编辑
  onEdit = record => () => {
    this.setState({edit_visible: true, record});

  }


  //直接请求service创建
  createService = async (values) => {

    const payload = {
      "monitor_name": values.monitor_name,
      "ip": values.ip,
      "port": values.port,
      "type": "port",
      "remark": values.remark,
      "is_on": "acmp",
      "interval_time": values.interval_time.toString()
    }

    const res = await monitorPort.addPort(payload);
    if (res.success) {
      message.success("创建端口监控成功！", 2)
      this.setState({visible: false});
      this.onSearch("");

    } else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "创建失败",
      });
    }
  }

  //创建按钮弹窗
  onCreateModal = () => {
    this.setState({visible: true});
  }

  // 删除
  del = name => async () => {
    console.log(name)
    if (name.length === 0) {
      message.error("请选择要删除的监控！", 2).then(r => r)
    }
    const res = await monitorPort.delPort({"delName": name});
    if (res.success) {
      message.success("删除成功！", 2)
      this.onSearch("")
    } else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "删除失败",
      });
    }
  }



  //搜索
  onSearch = async (value) => {
    const res = await monitorPort.getMonitorPort({"searchName": value});
    if (res.success) {
      this.setState({portList: res.data});
    } else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "更新失败"
        ,
      });
    }
  }

  //直接请求service编辑
  editService = async (values) => {

    const payload = {
      "monitor_name": values.monitor_name,
      "ip": values.ip,
      "port": values.port,
      "type": "port",
      "remark": values.remark,
      "is_on": this.state.record.is_on,
      "interval_time": values.interval_time.toString()
    }
    const res = await monitorPort.updatePort(payload);
    if (res.success) {
      message.success("更新端口监控成功！", 2)
      this.setState({edit_visible: false});
      this.onSearch("");

    } else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "更新失败"
        ,
      });
    }
  }

  // 子组件取消调用的
  cancelModal = () => {
    this.setState({visible: false, edit_visible: false});
  }

  is_onService = async (values) => {
    const payload = {
      "monitor_name": values.monitor_name,
      "ip": values.ip,
      "port": values.port,
      "type": "port",
      "remark": values.remark,
      "is_on": values.is_on,
      "interval_time": values.interval_time.toString()
    }
    let action = "编辑端口监控"
    if (values.is_on === "acmp") {
      action = "开启端口监控"
    } else {
      action = "关闭端口监控"
    }

    const res = await monitorPort.updatePort(payload);
    if (res.success) {
      message.success(action + "成功！", 2)
    } else {
      notification.error({
        message: '接口报错',
        duration: null,
        description:
          "编辑失败",
      });
    }
  }

  onSwitchChange = (checked, record) => {
    if (checked) {
      record.is_on = "acmp"
    } else {
      record.is_on = "off"
    }

    this.is_onService(record).then(r => r)
    this.setState({record: record})
    // console.log(this.state.record)
  }


  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  };

  render() {
    const {visible, edit_visible, record, selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              return index % 2 === 0;

            });
            this.setState({selectedRowKeys: newSelectedRowKeys});
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              return index % 2 !== 0;

            });
            this.setState({selectedRowKeys: newSelectedRowKeys});
          },
        },
      ],
    };
    const columns = [
      {
        title: '是否开启监控',
        dataIndex: 'is_on',
        width: 200,
        render: (text, record) => {
          let ced = false
          if (text === "acmp") {
            ced = true
          }
          return (
            <div>
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={ced}
                      onChange={e => this.onSwitchChange(e, record)}/>
            </div>
          );
        },
      },
      {
        title: '名称',
        dataIndex: 'monitor_name',
        render: (text, record) => {
          return (
            <Space align="baseline" style={{position: 'relative', top: '8px'}}>
              <Ellipsis length={35} tooltip>
                {text}
              </Ellipsis>
              <Paragraph copyable={{tooltips: false, text: text}}/>
            </Space>
          );
        },
      },

      {
        title: 'IP',
        dataIndex: 'ip',
        render: (text, record) => {
          return (
            <Space align="baseline" style={{position: 'relative', top: '8px'}}>
              <Ellipsis length={15} tooltip>
                {text}
              </Ellipsis>
              <Paragraph copyable={{tooltips: false, text: text}}/>
            </Space>
          );
        },
      },

      {
        title: '端口',
        dataIndex: 'port',
        render: (text, record) => {
          return (
            <Space align="baseline" style={{position: 'relative', top: '8px'}}>
              <Ellipsis length={15} tooltip>
                {text}
              </Ellipsis>
              <Paragraph copyable={{tooltips: false, text: text}}/>
            </Space>
          );
        },
      },
      {
        title: '描述',
        dataIndex: 'remark',
      },
      {
        title: '探测间隔(s)',
        dataIndex: 'interval_time',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          return (
            <div>
              <Button type='primary' onClick={this.onEdit(record)}>编辑</Button>
              <Divider type="vertical"/>
              <Popconfirm title="确定删除吗？" onConfirm={this.del([record.monitor_name])} okText="确定" cancelText="取消">
                <Button danger type='primary' href="#">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{padding: 24, background: '#fff', minHeight: 660}}>
        <Row>
          <Col span={8}><Search placeholder="请输入关键字" onSearch={this.onSearch} allowClear={true} enterButton/> </Col>
          <Col span={2} offset={14}>
            <Space size={8}>
              <Button
                type='primary'
                onClick={this.onCreateModal}
              >添加</Button>
              <Popconfirm title="确定删除吗？" onConfirm={this.del(selectedRowKeys)} okText="确定" cancelText="取消">
                <Button
                  danger
                  type='primary'
                  disabled={!hasSelected}
                >删除</Button>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Title level={5}>端口监控列表(创建修改5分钟内生效)</Title>
          </Col>
          <Col>
            <Space size={5}>
              <IconFont type="icon-prometheus"/>
              <a key={"href"} href={"https://github.com/jurycu/umi-dva-antd-admin"}
                 target={"_blank"}>告警列表</a>
              <IconFont type="icon-grafana"/>
              <a key={"href"} href={"https://github.com/jurycu/umi-dva-antd-admin"}
                 target={"_blank"}>grafana</a>
            </Space>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.portList} loading={this.state.loading} rowKey="monitor_name"
               rowSelection={rowSelection}>
        </Table>
        <PortCreateFormModal visible={visible} onCancel={this.cancelModal} onCreate={this.createService}/>
        <PortEditFormModal edit_visible={edit_visible} record={record} onCreate={this.editService}
                           onCancel={this.cancelModal}/>

      </div>
    );
  }
}

export default List;
