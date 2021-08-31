import React, {Component} from 'react';
import {Breadcrumb, Menu} from 'antd';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
//具体导航的名称

let breadcrumbNameMap = {
  [BreadPath + 'work']: '首页',
  [BreadPath + 'work/table']: '表格页面',
  [BreadPath + 'work/table/basic']: '基础表格',
  [BreadPath + 'work/table/search']: '查询表格',
  [BreadPath + 'work/umi']: 'umi使用',
  [BreadPath + 'work/umi/user']: '用户管理',
  [BreadPath + 'work/umi/monitor']: '监控管理',
  [BreadPath + 'work/dva']: 'dva使用',
  [BreadPath + 'work/dva/user']: '用户管理',
  [BreadPath + 'work/dva/monitor']: '监控管理',
  [BreadPath + 'work/system']: '系统管理',
  [BreadPath + 'work/system/user']: '用户管理',
  [BreadPath + 'work/system/record']: '操作记录',
};

const tableMenu = (
  <Menu>
    <Menu.Item>
      <Link to={"/work/table/basic"}>基础表格</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to={"/work/table/search"}>查询表格</Link>
    </Menu.Item>
  </Menu>
)

const umiMenu = (
  <Menu>
    <Menu.Item>
      <Link to={"/work/umi/user"}>用户管理</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={"/work/umi/monitor"}>监控管理</Link>
    </Menu.Item>
  </Menu>
)

const dvaMenu = (
  <Menu>
    <Menu.Item>
      <Link to={"/work/dva/user"}>用户管理</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={"/work/dva/monitor"}>监控管理</Link>
    </Menu.Item>
  </Menu>
)

const systemMenu = (
  <Menu>
    <Menu.Item>
      <Link to={"/work/system/user"}>用户管理</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={"/work/system/record"}>操作记录</Link>
    </Menu.Item>
  </Menu>
)

class BreadcrumbCustom extends Component {
  //利用PropTypes记住所跳转每个页面的位置
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      pathSnippets: null,
      extraBreadcrumbItems: null
    }
  }

  getPath() {
    String.prototype.trim = function (char, type) {
      if (char) {
        if (type === 'left') {
          return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type === 'right') {
          return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
      }
      return this.replace(/^\s+|\s+$/g, '');
    };
    //对路径进行切分，存放到this.state.pathSnippets中
    this.state.pathSnippets = window.location.pathname.split('/').filter(i => i);
    //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
    this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
      const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
      if (url === BreadPath + 'work/table') {
        return (
          <Breadcrumb.Item key={url} overlay={tableMenu}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>)
      } else if (url === BreadPath + 'work/umi') {
        return (
          <Breadcrumb.Item key={url} overlay={umiMenu}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>)
      } else if (url === BreadPath + 'work/dva') {
        return (
          <Breadcrumb.Item key={url} overlay={dvaMenu}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>)
      } else if (url === BreadPath + 'work/system') {
        return (
          <Breadcrumb.Item key={url} overlay={systemMenu}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>)
      } else {
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {breadcrumbNameMap[url]}
            </Link>
          </Breadcrumb.Item>

        );
      }
    });
  }

  UNSAFE_componentWillMount() {
    //首次加载的时候调用，形成面包屑
    this.getPath();
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextCon) {
    //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
    this.getPath();
  }

  render() {
    return (
      <Breadcrumb style={{margin: '12px 0'}}>
        {this.state.extraBreadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default BreadcrumbCustom;
