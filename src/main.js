import Vue from 'vue'
import App from './App.vue'

import { createRouter } from './router/index';
import { createStore } from './store';

Vue.mixin({
  beforeMount(){
    const { asyncData } = this.$options

    // 将获取数据操作分配给 promise
    // 以便在组件中，我们可以在数据准备就绪后
    // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
    if(asyncData){
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

// 返回工厂函数，每次请求创建一个vue实例
export function createApp(context){
  // 1、创建路由器实例
  const router = createRouter()
  const store = createStore()

  // 2、创建vue实例
  const app = new Vue({
    router,
    store,
    context, // 上下文，用于给渲染器传参数
    render: h => h(App)
  })

  return {app, router, store}
}
