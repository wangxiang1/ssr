// nodejs代码
// 导入express作为渲染服务器
const express = require('express')
const path = require('path')
const fs = require('fs')

// 获取express实例
const server = express()

const Vue = require('vue')

// 获取渲染器实例
const {createRenderer} = require('vue-server-renderer')
const render = createRenderer()

// 处理静态资源favicon
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico' )))

// Promise实现
// server.get('/', (req, res) => 
// new Promise((resolve, reject) => {
//   const html = render.renderToString(vm)
//   resolve(html)
// }).then(data => res.send(data))
// .catch(err => {
//   res.status(500).send(err)
// }))

// async实现
server.get('*', async (req, res) => {
  // renderToString可以将vue实例转换为html字符串
  console.log(req.url)

  // 解析模板名称
  const template = req.url.substr(1) || 'index'
  // 加载模块
  const buffer = fs.readFileSync(path.join(__dirname,  `${template}.html`))
  
  // 待渲染的vue实例
  const vm = new Vue({
    data: {
      name: 'wangxiang12222'
    },
    template: buffer.toString(), // 转换为模板字符串
    methods: {
      handleClick(){
        console.log('click')
      }
    }
  })

  try {
    const html = await render.renderToString(vm)
    res.status(200).send(html)
  } catch (error) {
    res.status(500).send(error)
  }
})

// server.get('/user', (req, res) => {
//   res.send('username: ceshi')
// })

server.listen(3000, () => {
  console.log('start success');
})
