import { createApp } from "./main";

// 客户端入口，用于静态内容“激活”

// 客户端也需要创建vue实例
const {app, router, store} = createApp()

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态自动嵌入到最终的 HTML 
// 在客户端挂载到应用程序之前，store 就应该获取到状态：
if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})