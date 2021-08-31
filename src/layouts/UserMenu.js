import {Menu} from "antd";
import {HomeOutlined, PieChartOutlined, SettingFilled} from "@ant-design/icons";
import {Link} from "umi";
import React from "react";

const {SubMenu} = Menu;

const UserMenu = ({role}) => {
  if (role === "admin") {
    return (
      <div style={{position: 'relative', top: '20px'}}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="0" icon={<HomeOutlined/>}>
            <Link to={"/work/home"}>首页</Link>
          </Menu.Item>

          <SubMenu key="2" icon={<PieChartOutlined/>} title="umi使用">
            <Menu.Item key="2-1"><Link to={"/work/umi/user"}>用户管理</Link></Menu.Item>
            <Menu.Item key="2-2"><Link to={"/work/umi/monitor"}>监控管理</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="3" icon={<PieChartOutlined/>} title="dva使用">
            <Menu.Item key="3-1"><Link to={"/work/dva/user"}>用户管理</Link></Menu.Item>
            <Menu.Item key="3-2"><Link to={"/work/dva/monitor"}>监控管理</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<PieChartOutlined/>} title="Table页面">
            <Menu.Item key="4-1"><Link to={"/work/table/basic"}>基础表格</Link></Menu.Item>
            <Menu.Item key="4-3"><Link to={"/work/table/search"}>搜索表单</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="5" icon={<SettingFilled/>} title="系统管理">
            <Menu.Item key="5-1"><Link to={"/work/system/user"}>用户管理</Link></Menu.Item>
            <Menu.Item key="5-2"><Link to={"/work/system/record"}>操作记录</Link></Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  } else if (role === "general") {
    return (
      <div style={{position: 'relative', top: '20px'}}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="5" icon={<HomeOutlined/>}>
            <Link to={"/work/home"}>首页</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<PieChartOutlined/>} title="umi使用">
            <Menu.Item key="2-1"><Link to={"/work/umi/user"}>用户管理</Link></Menu.Item>
            <Menu.Item key="2-2"><Link to={"/work/umi/monitor"}>监控管理</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="3" icon={<PieChartOutlined/>} title="dva使用">
            <Menu.Item key="3-1"><Link to={"/work/dva/user"}>用户管理</Link></Menu.Item>
            <Menu.Item key="3-2"><Link to={"/work/dva/monitor"}>监控管理</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<PieChartOutlined/>} title="Table页面">
            <Menu.Item key="4-1"><Link to={"/work/table/basic"}>基础表格</Link></Menu.Item>
            <Menu.Item key="4-3"><Link to={"/work/table/search"}>搜索表单</Link></Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  } else {
    window.location.href = `https://127.0.0.1:8000`;
  }
}

export default UserMenu