// nodejs代码
// 导入express作为渲染服务器
const express = require('express')
const path = require('path')
const fs = require('fs')

// 获取express实例
const server = express()

// 获取绝对路由函数
function resolve(dir){
  // 把当前执行js文件绝对路径和传入的dir进行拼接
  return path.resolve(__dirname, dir)
}

const Vue = require('vue')

// 处理静态资源favicon
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico' )))

// 1、开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
server.use(express.static(resolve('../dist/client'), {index: false}))

// 2、获取渲染器实例
const {createBundleRenderer} = require('vue-server-renderer')

// 3、导入服务端打包文件
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))

// 4、创建渲染器
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8");
const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"));
// 参数1：服务端的brundle
const render = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template, // 宿主文件
  clientManifest // 客户端清单
})

// 编写路由处理不同的url请求
server.get('*', async (req, res) => {
  console.log(req.url)
  
  // 构造上下文
  const context = {
    title: 'ssr context',
    url: req.url // 首屏地址
  }

  try {
    // 渲染输出
    const html = await render.renderToString(context)

    //响应给前端
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器渲染出错')
  }

})

server.listen(3000, () => {
  console.log('start success');
})
