[English](./README.md) · 中文

# openAPI UI
一个简单轻量、比 swagger-ui 更美观的 openapi 接口文档，可以快速的生成模拟请求参数并调用 api 请求

#### 快速开始
```bash
// node version >= 18
// 下载依赖包
pnpm install
# or make install

// 启动
npm run dev
# or make dev
```

#### 其他命令
```bash
// 打包构建
npm run build
# or make build

// 生成docker镜像
make docker-build

// 运行docker镜像
make docker-run

// 生成docker镜像，并且运行docker镜像
make docker-build-run
```

#### 关于使用方法
* 输入openapi的网关地址
* 上传 openapi.json 或者 openapi.yml 文件
* 输入 openapi.json 或者 openapi.yml 文本

#### 关于模拟接口请求数据
* 如果 openapi 接口请求参数 schema 定义了 format 字段，则使用[openapi-sampler](https://github.com/Redocly/openapi-sampler) 去生成模拟请求参数
* 如果 openapi 接口请求参数 schema 没有定义 format 字段, 则使用 faker 去生成模拟请求参数

#### 关于全局配置
* 支持配置接口请求超时时间

#### 关于不能连接内网api
* 如果不能连接内网api, 你可以在本地运行此项目或者使用 docker 在本地或者服务器部署此项目

#### 关于分享url
* 为了保持url的简洁性, 如果想要分享url供他人快速访问，则需要点击页面右上角的 分享url按钮 生成分享链接，然后再进行分享

#### 关于node版本
node >= 18