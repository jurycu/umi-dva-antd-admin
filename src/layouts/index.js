import {Link} from 'umi';
import {Image, Layout} from 'antd';
import React, {Component} from 'react';
import './index.css'
import {Watermark} from '@alitajs/antd-plus';
import logo from '../assets/mb.png';
import BreadcrumbCustom from './BreadcrumbCustom';
import UserMenu from "./UserMenu"
//TODO 增加logo
import {createFromIconfontCN} from '@ant-design/icons';
import Space from "antd/es/space";


const {Header, Content, Footer, Sider} = Layout;
const role = 'admin'
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2630304_0cpyghmsu5fi.js'
  ],
});

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    time: null,
    userRole: ""
  };
  //

  // access = () => {
  //   return useAccess;
  // }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };


  render() {
    const {collapsed} = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div style={{height: '54px'}}>
            <Link to="/">
              <img alt="logo" style={{position: 'relative', height: '34px', marginLeft: '25px', top: '14px'}}
                   src={logo}/>
              <span style={{
                position: 'relative',
                top: '18px',
                marginRight: '5px',
                color: 'white',
                fontWeight: '600',
                fontSize: '22px',
                fontFamily: 'Avenir, \'Helvetica Neue\', Arial, Helvetica, sans-serif'
              }}>    基础模板 </span>
            </Link>
          </div>
          <UserMenu role={role}/>

        </Sider>
        <Layout className="site-layout">
          {/*#fff白*/}
          <Header style={{position: 'relative', background: 'dark', textAlign: 'right', padding: 0}}>
                      <span style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        position: 'relative',
                        right: '400px',
                        color: '#fff'
                      }}>
                        你好，小俊 !
                      </span>
            <IconFont type="icon-bangzhu" style={{position: 'relative', right: '132px', color: '#A9A9A9'}}/>
            <a target="_blank" style={{position: 'relative', right: '130px', color: '#A9A9A9'}}
               rel="noopener noreferrer" href="https://github.com/jurycu/umi-dva-antd-admin">
              帮助
            </a>
            <IconFont type="icon-zu802" style={{position: 'relative', right: '105px', color: '#A9A9A9'}}/>
            {/*<DingdingOutlined style={{position: 'relative', right: '105px', color: '#A9A9A9'}}/>*/}
            <a style={{position: 'relative', right: '100px', color: '#A9A9A9'}}
               href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=xsss">钉钉答疑</a>
            {/*<span style={{position: 'relative', right: '80px', color: '#A9A9A9'}}>{this.state.time}</span>*/}
            <Image
              width={30}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              style={{borderRadius: '50%', position: 'relative', right: '50px', top: '10px'}}
              src={"https://avatars.githubusercontent.com/u/67884665?s=40&v=4"}
            />
            <a target="_blank" rel="noopener noreferrer" href={"https://github.com/jurycu/umi-dva-antd-admin"} style={{
              fontFamily: "Verdana, sans-serif",
              position: 'relative',
              right: '40px',
              color: '#A9A9A9',
              fontSize: '14px'
            }}>小俊</a>
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <BreadcrumbCustom/>
            <div>
              {/*<div style={{padding: 24, background: '#fff', minHeight: 660}}>*/}
              <Watermark isBody
                         text={["admin", "antd umi模板工程"]}
                         fontColor={"#BFC9CA"}/>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            <Space size={8}>
              <IconFont type="icon-huaban88" style={{fontSize: 20}}/>
              <a key={"href"} href={"https://github.com/jurycu"}
                 target={"_blank"}>>>更多介绍点击前往github主页</a>

            </Space>
          </Footer>
        </Layout>
      </Layout>
    );

  }
}

