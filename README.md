<p align="center">
  <a href="https://github.com/jurycu/umi-dva-antd-admin">
    <img width="100" src="https://github.com/jurycu/umi-dva-antd-admin/blob/main/src/assets/mb.png">
  </a>
</p>

<h1 align="center">umi-dva-antd-admin</h1>

<div align="center">
开箱即用的中台前端/设计解决方案。
</div>

## ✨ 特性

- 🛡 **JavaScript**: 纯js编写，学习成本低
- 💎 **优雅美观**：基于 Ant Design 体系精心设计
- 🚀 **最新技术栈**：使用 React/umi/antd 等前端前沿技术开发
- 🔢 **Mock 数据**：实用的本地数据调试方案
- 📚 **数据流方案**：两种主流的数据流方案示例
- ⚙️  **最佳实践**：良好的工程实践助您持续产出高质量代码
- 🔐 **优秀的权限设计**：基于umi的Access

## 🎉 推荐

- 基于Antd的高级组件 [ProComponents](https://procomponents.ant.design/components/) 
- 好用的水印组件 [watermark](https://procomponents.ant.design/components/water-mark/)


## 📜 效果

<img src="https://github.com/jurycu/umi-dva-antd-admin/blob/main/src/assets/layout.png" /> 

## 🔐  关于权限

基于 [umi-access](https://umijs.org/plugins/plugin-access) 提供权限功能，

使用示例如下

```js
<Access
        accessible={role === "admin"}
        fallback={
          <div style={{padding: 24, background: '#fff', minHeight: 660}}>
            <Result
              status="403"
              title="403"
              subTitle="你没有权限访问当前页面，请联系管理员:xx给你分配权限."
              extra={[<DingdingOutlined key={"ding"}/>,
                <a key={"href"} href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=jxxx">钉钉直达</a>]
              }
            />,
            {this.props.children}
          </div>
        }
      >
        <div/>
      </Access>
```


## 📚  关于数据流
提供了两种主流数据流示例，一种是[dva](https://dvajs.com/),一种是umi直接的异步请求处理

#### dva
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

#### umi
请求示例如下：
```js
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
```

## ⌨️ 本地开发

```sh
# 克隆项目到本地
git clone https://github.com/jurycu/umi-dva-antd-admin.git

# 切换到项目目录
cd ./umi-dva-antd-admin

# 安装依赖
yarn

# 启动服务
yarn start
```

## 🖥  支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 👥 社区互助

| Github Issue                                      | 钉钉                                                                                     | 微信                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/jurycu/umi-dva-antd-admin/issues) | <img src="https://github.com/jurycu/umi-dva-antd-admin/blob/main/src/assets/dingtalk.jpg" width="100" /> | <img src="https://github.com/jurycu/umi-dva-antd-admin/blob/main/src/assets/wechat.png" width="100" /> |
