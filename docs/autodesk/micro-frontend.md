# Qiankun

## Introduction - What is qiankun?

Qiankun is one of an implementation of Micro Frontends, which based on [single-spa](https://github.com/CanopyTax/single-spa). It aims to make it easier and painless to build a production-ready micro frontend architecture system.

Qiankun hatched from Ant Financial’s unified frontend platform for cloud products based on micro frontends architecture. After full testing and polishing of a number of online applications, Ant f2e team extracted its micro frontend kernel and open sourced it. The frontend team hope to help the systems who has the same requirement more convenient to build its own micro frontends application in the community. At the same time, with the help of community, qiankun will be polished and improved.

At present, qiankun has served more than 200 online applications inside Ant, and it's definitely trustworthy in terms of ease of use and completeness.

## What is Micro FrontEnd?

It's a techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently.

The current popular micro-frontend solutions include the following:：

- iframe
- The pedestal mode, mainly based on route distribution, qiankun and single-spa are based on this mode
- Npm packages, That is, build components separately and load them on demand
- EMP，based on Webpack5 Module Federation
- Web Components

Micro Frontend's architecture has the following core values:

- Technology Agnostic

  > The main framework does not restrict access to the technology stack of the application, and the sub-applications have full autonomy.

- Independent Development and Deployment

  > The sub application repo is independent, and the frontend and backend can be independently developed. After deployment, the main framework can be updated automatically.

- Incremental Upgrade

  > In the face of various complex scenarios, it is often difficult for us to upgrade or refactor the entire technology stack of an existing system. Micro frontend is a very good method and strategy for implementing progressive refactoring.

- Isolated Runtime

  > State is isolated between each sub application and no shared runtime state.

The micro frontends architecture is designed to solve a single application in a relatively long time span. As a result of the increase in the number of people and teams involved, it has evolved from a common small application to a monolithic application then becomes unmaintainable. Such a problem is especially common in enterprise web applications.

## Core Design Philosophy Of Qiankun

- Simple

  > Since the main application and sub-applications can be independent of the technology stack, qiankun is just a jQuery-like library for users. You need to call several qiankun APIs to complete the micro frontends transformation of your application. At the same time, due to the design of qiankun's HTML entry and sandbox, accessing sub-applications is almost as simple as using an iframe.

- Decoupling/Technology Agnostic

  > As the core goal of the micro frontends is to disassemble the monolithic application into a number of loosely coupled micro applications that can be autonomous, all the designs of qiankun are follow this principle, such as HTML Entry, sandbox, and communicating mechanism between applications. Only in this way we can ensure that sub-applications truly have the ability to develop and run independently.

## What are some of the features of Qiankun

- Based On [single-spa](https://github.com/CanopyTax/single-spa) , provide more out-of-box APIs.
- Technology Agnostic，any javascript framework can use/integrate, whether React/Vue/Angular/JQuery or the others.
- HTML Entry access mode, allows you to access the son as simple application like use the iframe.
- Style Isolation, make sure styles don't interfere with each other.
- JS Sandbox, ensure that global variables/events do not conflict between sub-applications.
- Prefetch Assets, prefetch unopened sub-application assets during the browser idle time to speed up the sub-application opening speed.
- Umi Plugin, @umijs/plugin-qiankun is provided for umi applications to switch to a micro frontends architecture system with only one line code.

## Project Practise

> This article is suitable for newcomers to qiankun, and introduces how to build a qiankun project from 0. The project mainly consists of:

- **main application：**
  - Using umi3.5, not using [@umijs/plugin-qiankun](https://github.com/umijs/plugins/tree/master/packages/plugin-qiankun)，but using [qiankun](https://qiankun.umijs.org/zh/guide/getting-started) directly
- **vue sub application：**
  - Created with vue2.x
  - Using vue3.x, not built with vite yet, at present, vite mode is not compatible
- **react sub application：**
  - Created with create-react-app
- **umi3 sub application:**
  - Use umi3, Combine [@umijs/plugin-qiankun](https://github.com/umijs/plugins/tree/master/packages/plugin-qiankun)plugin
- **Micro apps built without webpack：**

  - Some non-webpack-built projects, such as jQuery projects, can follow this.

- **Angular Microapps：**

  - Version of @angular/cli@9.1.12 used

## Main application environment construction

> According to the official statement, the main application is not limited to the technology stack. It only needs to provide a container DOM, and then register the micro application and start it. Here we use umi to initialize.

### Initialize & install qiankun

```bash
  # Project initialization
  $ yarn create @umijs/umi-app
  # Install dependencies
  $ yarn
  # start up
  $ yarn start
  # Install qiankun
  $ yarn add qiankun
```

> The basic environment is completed, and some menus and routes are added to the main application for switching between the main application page and the main application and the micro application. The page layout and routing configuration will not be introduced too much here, and the source code will be provided at the end of the article. The general page is as follows:

![主页](./images/2022-05-15-19-57-12.png)

### Register the micro application in the main application

> Register the basic configuration information of the micro-app. When the browser url changes, the activeRule rules registered by each micro-app will be automatically checked, and the applications that meet the rules will be automatically activated. This example consists of one main application and six micro-applications. The configuration files of the micro-applications are added to the main application, and the registered micro-applications are managed separately.

### 注册微应用基本配置

> Add registerMicroAppsConfig.ts under the src folder of the main application, the contents are as follows:：

```javascript
const loader = (loading: boolean) => {
  // Here you can get whether the sub-application is loaded successfully,  which can be used to trigger the global loading
  console.log("loading", loading);
};

export const Microconfig = [
  //name: the name of the microapp,
  //entry: The entrance to the micro application,
  //container: A selector or Element instance for the microapp's container node,
  //activeRule: Activate the micro-app's rule (which can be matched to the micro-app's route),
  //loader: state of loading the microapp type is funciton return true | false,
  {
    name: "vue2",
    entry: "http://localhost:8001",
    container: "#subContainer",
    activeRule: "/vue2",
    loader,
  },
  {
    name: "vue3",
    entry: "http://localhost:8002",
    container: "#subContainer",
    activeRule: "/vue3",
    loader,
  },
  {
    name: "react",
    entry: "http://localhost:8003",
    container: "#subContainer",
    activeRule: "/react",
    loader,
  },
  {
    name: "umi",
    entry: "http://localhost:8004",
    container: "#subContainer",
    activeRule: "/umi",
    loader,
  },
  {
    name: "purehtml",
    entry: "http://127.0.0.1:8005",
    container: "#subContainer",
    activeRule: "/purehtml",
    loader,
  },
  //angular
  {
    name: "angular",
    entry: "http://127.0.0.1:8006",
    container: "#subContainer",
    activeRule: "/angular",
    loader,
  },
];
```

> The main application entry file imported registerMicroAppsConfig.ts and qiankun (if the main application uses umi, it is directly imported in pages/index.tsx)

```javascript
import LayoutPage from '@/layout/index';
import 'zone.js/dist/zone';
import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  MicroAppStateActions,
} from 'qiankun';
import { Microconfig } from '@/registerMicroAppsConfig';

/**
 * Register a Microapp
 */
registerMicroApps(Microconfig, {
  // qiankun Lifecycle Hooks - Before Microapps Load
  beforeLoad: (app: any) => {
    console.log('before load', app.name);
    return Promise.resolve();
  },
  // qiankun Lifecycle hooks - after the microapp is mounted
  afterMount: (app: any) => {
    console.log('after mount', app.name);
    return Promise.resolve();
  },
});

/**
 * start qiankun
 */
// start();
// There are many other configuration Options
start({
  prefetch: true, // enable preload
  sandbox: {
    experimentalStyleIsolation: true, //   optional, whether to open the js sandbox, default is true.
  },
});

/**
 * Set the micro-app that is entered by default after the main application is started
 * ActiveRule corresponding to the sub-application
 */
// setDefaultMountApp('/purehtml');

// Add global exception catch
addGlobalUncaughtErrorHandler((handler) => {
  console.log('exception catch ====', handler);
});

// global state
const state = {
  id: 'main_application',
};
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: the state after the change; prev the state before the change
  console.log('state====', state, 'prev====', prev);
});

actions.setGlobalState({
  id: 'main_app',
});

export default function IndexPage({ children }: any) {
  return (
    <LayoutPage>
      <div>{children}</div>
      <div id="subContainer"></div>
    </LayoutPage>
  );
}
```

## 创建对应的微应用

> 注意微应用的名称 `package.json` => `name` 需要和主应用中注册时的 `name` 相对应，且必须确保唯一。

### 微应用 vue2.x

#### 初始化

```bash
# 安装 vueCli
$ yarn add @vue/cli
# 创建项目
$ vue create vue2.x_root
# 选择 vue2 版本
# 安装依赖
$ yarn
# 启动
$ yarn serve
```

#### 改造成微应用

1. 在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. 入口文件 `main.js` 修改

```javascript
import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";

Vue.config.productionTip = false;

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    // 注意这里的name,最好不要写死，直接使用主应用传过来的name
    base: window.__POWERED_BY_QIANKUN__ ? `${props.name}` : "/",
    mode: "history",
    routes,
  });
  Vue.use(VueRouter);
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue2] vue app bootstraped");
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
```

3. 打包配置修改（`vue.config.js`）：

```javascript
const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  filenameHashing: true,
  lintOnSave: process.env.NODE * ENV !== "production",
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    // 修改默认端口，和注册时一直
    port: 8001,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 解决主应用加载子应用出现跨域问题
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 自定义 webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    // 让主应用能正确识别微应用暴露出来的一些信息
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp*${name}`,
    },
  },
};
```

4. 主应用查看加载效果

![](https://files.mdnice.com/user/16854/47c58b99-f1f5-42b3-a06c-4804eeaa6827.png)

### 微应用 vue3.x

#### 初始化

```bash
# 安装 vueCli
$ yarn add @vue/cli
# 创建项目
$ vue create vue3.x_root
# 选择 vue3 版本
# 安装依赖
$ yarn
# 启动
$ yarn serve
```

#### 改造成微应用

1. 在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. 入口文件 `main.ts` 修改

```javascript
//@ts-nocheck
import "./public-path";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";

let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;
  history = createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? `${props.name}` : "/"
  );
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("%c ", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  router = null;
  history.destroy();
}
```

3. 打包配置修改（`vue.config.js`）：

```javascript
const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== "production",
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    // 修改默认端口，和注册时一直
    port: 8002,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    // 让主应用能正确识别微应用暴露出来的一些信息
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

4. 主应用查看加载效果

![](https://files.mdnice.com/user/16854/9cbe3da7-a813-4ec8-9052-dd1c97c3b298.png)

### 微应用 react

#### 初始化

```bash
# 创建项目
$ yarn add create-react-app react_root
# 启动
$ yarn start
```

#### 改造成微应用

1. 在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. 设置 history 模式路由的 base：
   > 刚刚创建的项目没有路由，所以先要安装路由

```bash
# 路由安装
$ yarn add react-router react-router-dom
```

> 入口文件 index.js 修改，为了避免根 id #root 与其他的 DOM 冲突，需要限制查找范围。

```javascript
import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Link } from "react-router-dom";

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? "/react" : "/"}>
      <App />
    </BrowserRouter>,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props) {
  console.log("[react16] props from main framework", props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
```

3. webpack 打包配置修改
   > 安装插件 @rescripts/cli，当然也可以选择其他的插件，例如 react-app-rewired

```bash
# 安装
$ yarn add @rescripts/cli
```

> 根目录增加配置文件 `.rescriptsrc.js`,注意一定是根目录下哦

```javascript
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = "window";

    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
```

4. `package.json`配置修改

```javascript
{
  "name": "react_root",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@rescripts/cli": "^0.0.16",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "5.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "PORT=8003 rescripts start",
    "build": "rescripts  build",
    "test": "rescripts  test",
    "eject": "rescripts  eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

5. 主应用查看加载效果

![](https://files.mdnice.com/user/16854/606079c5-3378-4615-bb34-04c5a81cf1ab.png)

### 微应用 umi

> umi 项目初始化方式参考初始化主应用的方式。umi 应用使用 `@umijs/plugin-qiankun` 可以一键开启微前端模式。

#### 启用方式

1. 安装插件

```bash
# 安装 @umijs/plugin-qiankun
$ yarn add @umijs/plugin-qiankun
```

2. 修改配置文件 `umirc.ts`
   > 如果是配置文件抽离到`config`中，直接修改 `config.js`

```js
import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {},
  //开启qiankun配置
  qiankun: {
    slave: {},
  },
});
```

> 这里只是做了简单的集成配置，更过功能请参看[@umijs/plugin-qiankun](https://umijs.org/zh-CN/plugins/plugin-qiankun)

3. 加载效果

![](https://files.mdnice.com/user/16854/689c849d-c00e-4ffe-bcec-85df5c9fbfd9.png)

### 微应用非 webpack 应用

> 非 webpack 应用有个需要注意点的点：接入之前请确保你的项目里的图片、音视频等资源能正常加载，如果这些资源的地址都是完整路径（例如 <https://qiankun.umijs.org/logo.png>），则没问题。如果都是相对路径，需要先将这些资源上传到服务器，使用完整路径。

1. 入口文件声明 `entry`入口

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <body>
    <div id="test">测试微应用</div>
  </body>
</html>

<!-- entry 入口 -->
<script src="./index.js" entry></script>
```

2. index.js

```js
const render = ($) => {
  // 这里可以在渲染之前做些什么。。。
  return Promise.resolve();
};

((global) => {
  //purehtml 是对应的微应用名称
  global["purehtml"] = {
    bootstrap: () => {
      console.log("purehtml bootstrap");
      return Promise.resolve();
    },
    mount: (props) => {
      console.log("purehtml mount00000000000", props);
      props.onGlobalStateChange((state, prev) => {
        console.log(state, prev);
      });
      return render($);
    },
    unmount: () => {
      console.log("purehtml unmount");
      return Promise.resolve();
    },
  };
})(window);
```

3. 为了方便启动和加载，使用 `http-server` 启动本地服务
   > 根目录增加 `package.json`文件, 注意`name`:`purehtml`

```json
{
  "name": "purehtml",
  "version": "1.0.0",
  "description": "",
  "main": "index.html",
  "scripts": {
    "start": "cross-env PORT=8005 http-server . --cors",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "cross-env": "^7.0.2",
    "http-server": "^0.12.1"
  }
}
```

4. 加载效果

![](https://files.mdnice.com/user/16854/4607f8ea-62ee-42bc-b827-ddaf309710e5.png)

### 微应用 Angular

#### 初始化

```bash
# 安装 CLI
$ yarn add -g @angular/cli@9.1.12
# 创建项目
$ ng new angular_root
# 启动
$ ng serve
```

#### 改造成微应用

1. 在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
}
```

2. 设置 history 模式路由的 base，`src/app/app-routing.module.ts` 文件：

```js
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // @ts-ignore
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: window.__POWERED_BY_QIANKUN__ ? "/angular" : "/",
    },
  ],
})
export class AppRoutingModule {}
```

3. 修改入口文件，src/main.ts 文件

```js
import './public-path';
import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let app: void | NgModuleRef<AppModule>;
async function render() {
  app = await platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props: Object) {
  console.log(props);
}

export async function mount(props: Object) {
  render();
}

export async function unmount(props: Object) {
  console.log(props);
  // @ts-ignore
  app.destroy();
}
```

4. 修改 webpack 打包配置
   > 根据官方指示：先安装 `@angular-builders/custom-webpack` ，注意：angular 9 项目只能安装 9.x 版本，angular 10 项目可以安装最新版。

```bash
yarn add @angular-builders/custom-webpack@9.2.0
```

> 在根目录增加 `custom-webpack.config.js`

```js
const appName = require("./package.json").name;
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    library: `${appName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${appName}`,
  },
};
```

> 修改 angular.json 配置文件

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angularRoot": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "outputPath": "dist/angularRoot",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": [],
            "customWebpackConfig": {
              "path": "./custom-webpack.config.js"
            }
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "browserTarget": "angularRoot:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "angularRoot:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "angularRoot:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": ["**/node_modules/**"]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "angularRoot:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "angularRoot:serve:production"
            }
          }
        }
      }
    }
  },
  "defaultProject": "angular"
}
```

5. 启动尝试加载
   > 哇咔咔！！！ 报错。。。

![](https://files.mdnice.com/user/16854/93a2cfb8-a9df-4188-aca7-d4ecd77e2acf.png)

- 解决方式

  - 主应用中安装 `zoom.js` , 并且在 `import qiankun` 之前引入
  - 将微应用的 `src/polyfills.ts` 里面的引入 `zone.js`
  - 微应用 `src/index.html` `<head>` 中引入 `zone.js`

6. 再次启动尝试加载
   > 哇咔咔！！！ 又报错了。。。 什么鬼，页面倒是加载出来了，但是报了一串红

![](https://files.mdnice.com/user/16854/dc3c0008-baf5-4da0-853c-1ed98fd2bbbf.png)

> 查阅资料，貌似是热更新的 `bug` 啊。 这里不做过多解释，暴力解决方案：`作为子应用时不使用热更新`。

- `package.json` => `script` 中增加如下命令：

```js
"serve:qiankun": "ng serve --disable-host-check --port 8006 --base-href /angular --live-reload false"
```

> 作为微应用时使用：`ng serve:qiankuan` 启动加载

> build 报错问题： 修改 `tsconfig.json` 文件

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es5",
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}
```

4. 查看加载效果

![](https://files.mdnice.com/user/16854/0ad1c7ff-7202-4337-97e8-e9cb6dac344f.png)

## 应用间通信

> 多个应用间通信，这里举个简单的例子：主应用中登录获取用户`id`，当加载微应用时，微应用需要根据不同的用户 `id` 展示不同的数据或者展示不同的页面。这个时候就需要主应用中把对应的用户`id`传到微应用中去。传值方式，这里总结了三种方式：

- 挂载微应用时直接`props`传值
- `initGlobalState` 定义全局状态
- 定义全局的状态池

### props 传值

> 注册微应用的基础配置信息时，增加 `props` ,传入微应用需要的信息

```js
{
    name: 'vue2',
    entry: 'http://localhost:8001',
    container: '#subContainer',
    activeRule: '/vue2',
    //props
    props: {
      id: 'props基础传值方式'
    },
    loader,
  }
```

> 微应用中在 `mount` 生命周期 `props` 中获取

```js
export async function mount(props) {
  console.log("获取主应用传值", props);
  render(props);
}
```

![](https://files.mdnice.com/user/16854/fc083de1-7185-41af-8b01-81f5fdafffcf.png)

### initGlobalState (推荐)

> 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 `props` 获取通信方法。

1. 主应用中声明全局状态

```js
// 全局状态
const state = {
  id: "main_主应用",
};
// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);
// 监听状态变更
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
```

2. 微应用获取通信,同样在 `mount` 生命周期中获取

```js
export async function mount(props) {
  console.log("initGlobalState传值", props);
  render(props);
}
```

打印出来发现好像并没有我们需要的值：

![](https://files.mdnice.com/user/16854/8c132e3e-aa5d-4ccd-92b3-2c9d1b3f517f.png)

> 我想在这里，细心的同学应该会发现，好像有个`onGlobalStateChange`，`setGlobalState` 这两个方法，见名知意，应该是用来做状态的监听和修改使用的。不管什么神仙，先调用下试试看喽

> 封装一个 `storeTest` 方法做统一调用

```js
function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  // 为了演示效果明显增加定时器
  setTimeout(() => {
    props.setGlobalState &&
      props.setGlobalState({
        id: `${props.name}_子应用`,
      });
  }, 3000);
}
```

```js
export async function mount(props) {
  storeTest(props);
  render(props);
}
```

![](https://files.mdnice.com/user/16854/1d676684-f0ca-4b34-917e-266dc0cd3965.png)

`输出两次 ？？？`

> 输出两次的原因是在 `微应用` 中调用 `setGlobalState` , 主应用中的 `onGlobalStateChange` 也会执行

3. 总结下

- `initGlobalState` 初始化 `state`
- `onGlobalStateChange` 监听状态变更
- `setGlobalState` 修改状态
- `offGlobalStateChange` 移除监听

4. 问题
   > 如果想在微应用某个页面内修改全局状态应该怎么做 ？ 当然是可以把 `props` 中的方法挂载到当前应用的全局上啦。例如：

```js
export async function mount(props) {
  storeTest(props);
  render(props);
  // 挂载到全局 instance 上
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}
```

### 定义全局的状态池

> 定义全局状态池，说白了就是在主应用中定义全局状态，可以使用 `redux` `vuex` 等来定义。定义好全局状态，可以定义一个全局的类，类中声明两个方法，一个用来获取全局状态，一个用来修改全局状态。定义好之后，把这个类通过第一种 `props` 的传值方式传入，微应用通过 `mount`=>`props` 接收。这种方式就不做演示，个人建议使用第二种方式。

## Summary

> 到这里，基于`qiankun`的微前端搭建基本完成。本文只是对 qiankun 从 0 搭建到搭建过程中遇到问题并且解决问题以及后期项目中的一些基础配置和使用做简单概述。下一次将会对`多应用部署`问题做个详细概述。

In summary，If there is micro frontend applications scenario，I recommend that the team choose qiankun.

- **Simple**

  > Works with any javascript framework. Build your micro-frontend system just like using with iframe, but not iframe actually.

- **Complete**

  > Includes almost all the basic capabilities required to build a micro-frontend system, such as style isolation, js sandbox, preloading, and so on.

- **Production-Ready**

  > Had been extensively tested and polished by a large number of online applications both inside and outside of Ant Financial, the robustness is trustworthy.

So in fact, It's really probably the most complete micro-frontends solution I've ever met.

## Source Code

[https://github.com/keeperdog/autodesk](https://github.com/keeperdog/autodesk)
