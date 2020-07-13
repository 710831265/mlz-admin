# 贡献指南

## 🎯 Issue

@mlz/admin 通过 issue 对`需求`和`缺陷`进行管理，它们的分别释义如下：

### 需求

通过 issue.`功能添加` 对 **需求** 进行创建。你可以通过 github 的 Issue 面板直接创建需求。请**务必**按照 feature 模版填写。

### 缺陷

通过 issue.`Bug 反馈` 对 **缺陷** 进行创建和管理。创建方法同上，请**务必**按照 bug 模版填写。

## 🤝 协作方式

@mlz/admin 采用开源项目的管理方式，请您将项目 fork 到**自身目录**下进行 coding。代码编写完成之后，提交到 remote origin 的对应 branch，**而非 upstream**。之后从**自身目录 remote origin**的任意分支发起 pull request 到 juicecube/mlz-admin 的对应**sprint** 或 **feature** 分支，创建时的界面应如下图 👇：

![create PR](https://raw.githubusercontent.com/milobluebell/imgs-repo/master/WX20200709-182741.png)

## 🏭 工作流管理

@mlz/admin 要求采用编程猫现有的 git flow 管理规范对 GIT.Flow 进行管理：[《编程猫前端 Git Flow》](https://shimo.im/docs/aBAYV4XJdXfn8d3j)

> 除上述文档中契约之外，额外要求：
>
> 1. 保证 CI 等各类 checkers 必须通过。
> 2. 必须配有覆盖率不低于 **85%** 的自测用例。
> 3. 需要得到至少另一位管理员的 review approval 才能合并 PR。
> 4. 非编程猫官方的人员维护此库时只须遵循 antd 的贡献指南： [《ant-design 新特性提交规范》](https://github.com/ant-design/ant-design/wiki/PR-%E8%A7%84%E8%8C%83#ant-design-%E6%96%B0%E7%89%B9%E6%80%A7%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)

## 🏅 需求分配和领取

1. 需求创建请参照本节第一部分。
2. 需求分配本着`自愿领取为原则`。
3. 当无人认领时，`应由王福凯或王玉进行分配`。优先分配至由相关业务的开发人员。

## 🤵 CSS 原则

1. 我们沿用 antd/dumi，使用`.less`为组件编写样式。
2. 扩展的样式，css 命名规范按照`BEM命名规范`进行。"词根"默认为**admini**
   > - `规范`可参照：[腾讯 CSS BEM 书写规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
   >
   > - `代码`可参照**CommonTable**组件中的代码

## ⚛️ 组件设计原则

1. 尽量减少一个功能所需要的新增的 api。
2. 严禁覆盖 antd 原生 api，扩展也须谨慎。
3. 实现一个功能时，尽量使数据内聚，独自形成闭环。可以使用一个 api+数据实现的，不要分成多个。
4. Type 类型定义尽量和业务代码分开，不要放在同一个文件，即使 Types 很少。
5. api 命名尽量使用最贴合的英文单词，且尽量简短。降低使用者认知和记忆成本。

## 🍎 禁忌 (IMPORTANT 重要)

1. 大量使用`any`或者带有恶意 any
2. `命名`不符合编程猫前端开发规范(包括但不限于`文件命名`和`变量命名`)。
3. 文档的 Demo 示例，必须使用 `Class Component` 进行展示，不得使用 FC 组件。
4. 携带含有`敏感或编程猫业务信息`的代码进行 commit。
5. (TODO)

## 🔬 测试 (IMPORTANT 重要)

1. 测试覆盖率，不低于 85%。
2. 提交 PR 前，须保证 npm run test 可以正常通过，并且预设的 checkers 对应钩子执行通过。

## 📖 文档 (IMPORTANT 重要)

1. 要求对组件扩展出来的 api 有明确的展示说明和详尽使用方法。
2. 每个组件下的 APIs 节，只要求写多出于 antd 的，原生的不用复制一遍，原生 api 尽量引导用户去看 antd 的文档。

## 😊 开发最佳实践

#### 1. 情况 1⃣️：没有实际的业务需求。 则`直接项目内开发`👇

> 这种情况一般指，单纯地完成@mlz/admin 的已有 issue.Feature，那么直接运行`npm start`在 demo 页进行开发即可

#### 2. 情况 2⃣️：编写业务需求中的后台系统的组件。 则`通过npm link开发` 👇

> 为项目`projA`开发复用组件。
>
> 1.  先在项目中安装 mytils（因为@mlz/admin 平行依赖 mytils）

```shell
$ npm install mytils
```

> 2.  进入@mlz/admin 项目，开始编写组件代码。完成后，运行

```shell
$ npm dist
$
$ npm link
```

> 3.  进入`projA`项目，运行

```shell
$ npm link @mlz/admin
```

然后引用@mlz/admin，查看编码结果：

```jsx
import { Button } from '@mlz/admin'; // cjs引用
//or
import Button from '@mlz/admin/es/Button/Button'; // esm按需引用
```

之后你直接修改@mlz/admin 中的代码，并且重新执行 dist（不建议直接引用 src），在 projA 刷新就可以实时看到变化。

> 由于我们推荐使用 FC 组件，所以可能会出现如下报错：
>
> **Error: Invalid hook call. Hooks can only be called inside of the body of a function component**
>
> 可能是因为：
>
> 1.  https://github.com/facebook/react/issues/13991
> 2.  https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
> 3.  https://github.com/webpack/webpack/issues/8607#issuecomment-453068938
> 4.  如果以上三种情况无法解决，则可能是由于 React 自身 bug 导致。参考 👉https://github.com/facebook/react/issues/13991#issuecomment-435135293 ，那么就必须使用第三种开发方式 👇

#### 3. 情况 3⃣️：使用 npm link 开发组件时遇到困难。 则`通过npm dist + pack开发` 👇

即先按照`情况1⃣️`进行开发，每次调试时，需要先运行`npm run dist`打包出至少 esm/lib 两种模式 pkg，然后再运行`npm pack`，这个时候项目根目录会多处一个 `.tgz` 文件，将该文件拖拽到 projA，然后在 projA 的终端安装它，比如：

```shell
$ npm install ./mlz-admin-0.0.9.tgz
```

之后使用即可：

```jsx
import { Button } from '@mlz/admin'; // cjs引用
//or
import Button from '@mlz/admin/es/Button/Button'; // esm按需引用
```
