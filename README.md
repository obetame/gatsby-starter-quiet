<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's blog starter
</h1>

Kick off your project with this blog boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 特性

![blog screen](https://github.com/zhouyuexie/gatsby-starter-quiet/blob/master/static/download/screen.png?raw=true)

- 开箱即用
- 支持系统主题切换(详细查看[CSS3 媒体查询-Dark 模式](https://www.quietboy.net/posts/2019-05-30/CSS3%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2-Dark%E6%A8%A1%E5%BC%8F))
- TypeScript 支持
- RSS 支持
- SCSS 支持
- Google 分析同级
- MarkDown 图片懒加载
- MarkDown 草稿支持
- 自定义主题一键切换
- 使用[FiraCode 英文字体](https://github.com/tonsky/FiraCode)
- 使用 FontaweSome 图标
- git commit 消息检查 commitlint[](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

提供开箱即用的博客模板`posts`和`sample`(默认为`posts`样式),也可以开发自定义模板并修改`src/data/config.yml`中配置一键切换.

```yml
# crate page config
createPageConfig:
  activeLayout: posts
  posts:
    homePath: /posts/page/1
    list: posts-list.tsx
    listPath: /posts/page/:page
    detail: posts-detail.tsx
    detailPath: /posts/:date/:title
    tag: posts-tag.tsx
    tagPath: /tags/:tag
  sample:
    list: sample-list.tsx
```

`posts`为默认模板,可修改`activeLayout: sample`,将会使列表页替换为`posts`模板的列表页.

## 🚀 开始

1.  **创建一个 Gatsby 项目:**

    使用 Gatsby 命令后工具创建一个新的站点

    ```sh
    gatsby new my-blog-starter https://github.com/zhouyuexie/gatsby-starter-quiet
    ```

2.  **开始开发:**

    切换到你的项目目录并启动

    ```sh
    cd my-blog-starter/
    gatsby dev
    ```

3.  **打开你的编辑器开始编写代码**

    你的站点运行在 `http://localhost:8000`!

    _注意: 这是第二个链接 _`http://localhost:8000/___graphql`_. 这是一个可以查询你所有数据的工具,如果你需要更多关于此工具的消息,请查看官方文档[Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    打开并编辑`src/templates/posts-list.tsx`文件. 保存后浏览器中会即时刷新.

4.  **编译上传**

    运行 `yarn build` 编译你的网站,所有静态内容都在`./public`文件夹中.
    如果需要上传到自己服务器,请先编辑`./deploy.sh`文件增加你的服务器信息,再执行`yarn deploy`

上传前可以运行`yarn local`命令本地测试开发模式(没有 hot reload 功能)

## 🧐 项目里面有什么?

项目目录如下:

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── .babelrc
    ├── tsconfig.json
    ├── tslint.json
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── yarn-lock
    ├── tasks
    ├── static
    ├── posts
    ├── package.json
    └── README.md

主要的文件含义:

1.  **`/node_modules`**: 项目依赖.

2.  **`/src`**: 包含所有的项目源代码,会被编译成静态页面.

3.  **`.gitignore`**: git 忽略的文件

4.  **`.prettierrc`**: 这是[Prettier](https://prettier.io/)的配置文件. Prettier 将保持你的代码被正确格式化.

5.  **`gatsby-browser.js`**: [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/)文件.

6.  **`gatsby-config.js`**: 这是 Gatsby 主要的配置文件,所有插件都在此配置,也包含了 metadata 数据,查看[config docs](https://www.gatsbyjs.org/docs/gatsby-config/)获取更多的信息.

7.  **`gatsby-node.js`**: [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)文件.

8.  **`gatsby-ssr.js`**: [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/)文件

9.  **tsconfig.json**: typescript 配置文件

10. **tslint.json**: typescript 代码检测

11. **tasks**: `gatsby-node.js`相关的任务.

12. **static**: 静态文件,会简单 copy 到`public`文件中提供访问.

13. **posts**: MarkDown 格式博客,相关图片引用也在内部文件夹中的`images`.

## 其它

- 关于 MarkDown 的编写请访问: [Gatsby 的 MarkDown 使用示例](https://www.quietboy.net/posts/2019-06-14/Gatsby%E7%9A%84MarkDown%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)
- sitemap(站点图)请访问网站跟路径`/site.xml`
- RSS 请访问网站跟路径`feed.xml`
- 移动端使用 Chrome 访问可以添加网站到桌面
