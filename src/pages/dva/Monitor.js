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
import {addRecord} from "../../utils/record";
import Cookies from "js-cookie";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {createFromIconfontCN} from "@ant-design/icons";
import {sleep} from "../utils";

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

function mapStateToProps(state) {
  return {
    portList: state[namespace].portList,
    portListLoading: state[namespace].portListLoading,
  };
}


const mapDispatchToProps = (dispatch) => {

  return {
    //运行时加载
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryPortList`,
        payload: {"searchName": ""}
      });
    },

    //搜索
    onSearch: (value) => {
      dispatch({
        type: `${namespace}/queryPortList`,
        payload: {"searchName": value}
      });
    },

    //删除
    onDel: (name) => {
      dispatch({
        type: `${namespace}/delPort`,
        payload: {"delName": [name]}
      });
    },

    //批量删除
    onBatchDel: (batchName) => {
      dispatch({
        type: `${namespace}/delPort`,
        payload: {"delName": batchName}
      });
    }

  };
};

class List extends React.Component {
  state = {
    visible: false, // 弹框默认隐藏
    record: {},
    selectedRowKeys: [],
    search: false,
    edit_visible: false //编辑弹窗默认隐藏
  }

  componentDidMount() {
    this.props.onDidMount();
  }

  //编辑
  onEdit = record => () => {
    this.setState({edit_visible: true, record});

  }


  //直接请求service创建
  createService = async (values) => {
    let create_ip = [], create_port = []
    let ipList = values.ip.split("\n"), portList = values.port.split("\n")
    for (let ip of ipList) {
      if (ip !== "") {
        create_ip.push(ip)
      }
    }
    for (let port of portList) {
      if (port !== "") {
        create_port.push(port)
      }
    }
    const payload = {
      "name": values.monitor_name,
      "ip": create_ip,
      "port": create_port,
      "type": "port",
      "remark": values.remark,
      "is_on": "acmp",
      "interval": values.interval_time.toString()
    }

    const res = await monitorPort.addPort(payload);
    if (res) {
      if (res.code === 200) {
        message.success("创建端口监控成功！", 2)
        this.setState({visible: false});
        this.props.onDidMount();
      } else {
        notification.error({
          message: '接口报错',
          duration: null,
          description:
          "创建失败",
        });
      }
    }
  }

  //创建按钮弹窗
  onCreateModal = () => {
    this.setState({visible: true});
  }

  // 删除
  del = name => () => {
    this.props.onDel(name);
    sleep(300)
    this.props.onDidMount();
  }

  //批量删除
  batchDel = batchName => () => {
    if (batchName.length === 0) {
      message.error("请选择要删除的监控！", 2).then(r => r)
    } else {
      console.log(batchName)
      this.props.onBatchDel(batchName)
      sleep(300)
      this.props.onDidMount()
    }

  }

  //搜索
  onSearch = (value) => {
    console.log(value)
    this.props.onSearch(value.replace(/\s+/g, ""));
  }

  //直接请求service编辑
  editService = async (values) => {
    let update_ip = [], update_port = []
    let ipList = values.ip.split("\n"), portList = values.port.split("\n")
    for (let ip of ipList) {
      if (ip !== "") {
        update_ip.push(ip)
      }
    }
    for (let port of portList) {
      if (port !== "") {
        update_port.push(port)
      }
    }
    const payload = {
      "name": values.monitor_name,
      "ip": update_ip,
      "port": update_port,
      "type": "port",
      "remark": values.remark,
      "is_on": this.state.record.is_on,
      "interval": values.interval_time.toString()
    }
    const res = await monitorPort.updatePort(payload);
    if (res) {
      if (res.code === 200) {
        message.success("更新端口监控成功！", 2)
        this.setState({edit_visible: false});
        this.props.onDidMount();

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
  }

  // 子组件取消调用的
  cancelModal = () => {
    this.setState({visible: false, edit_visible: false});
  }

  is_onService = async (values) => {
    let update_ip = [], update_port = []
    let ipList = values.ip.split("\n"), portList = values.port.split("\n")
    for (let ip of ipList) {
      if (ip !== "") {
        update_ip.push(ip)
      }
    }
    for (let port of portList) {
      if (port !== "") {
        update_port.push(port)
      }
    }
    const payload = {
      "name": values.monitor_name,
      "ip": update_ip,
      "port": update_port,
      "type": "port",
      "remark": values.remark,
      "is_on": values.is_on,
      "interval": values.interval_time.toString()
    }
    let action = "编辑端口监控"
    if (values.is_on === "acmp") {
      action = "开启端口监控"
    } else {
      action = "关闭端口监控"
    }

    const res = await monitorPort.updatePort(payload);
    if (res) {
      if (res.code === 200) {
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
    console.log(selectedRows)
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
              <Popconfirm title="确定删除吗？" onConfirm={this.del(record.monitor_name)} okText="确定" cancelText="取消">
                <Button danger type='primary' href="#">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const {portList, portListLoading} = this.props;
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
              <Popconfirm title="确定删除吗？" onConfirm={this.batchDel(selectedRowKeys)} okText="确定" cancelText="取消">
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
        <Table columns={columns} dataSource={portList} loading={portListLoading} rowKey="monitor_name"
               rowSelection={rowSelection}>
        </Table>
        <PortCreateFormModal visible={visible} onCancel={this.cancelModal} onCreate={this.createService}/>
        <PortEditFormModal edit_visible={edit_visible} record={record} onCreate={this.editService}
                           onCancel={this.cancelModal}/>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
