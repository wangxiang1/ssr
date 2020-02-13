// 服务端入口，用于首屏内容渲染

// 调用main里的工厂函数，创建实例
import { createApp } from './main'

// 该函数会被express的路由处理函数调用，用于创建vue实例
export default context => {
  // 返回promise，确保所有的异步操作都结束
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp(context)

    // 显示首屏处理
    router.push(context.url)

    // 检测路由就绪事件
    router.onReady(() => {
      // 获取匹配的路由组件数组
      const matchedComponents = router.getMatchedComponents();
      // 若无匹配则抛出异常
      if (!matchedComponents.length) {
         return reject({ code: 404 });
       }
        
       // 对所有匹配的路由组件调用可能存在的`asyncData()`
       Promise.all(
        matchedComponents.map(Component => {
         if (Component.asyncData) {
          return Component.asyncData({
           store,
           route: router.currentRoute,
         });
        }
       }),
      ).then(() => {
       // 所有预取钩子 resolve 后，
       // store 已经填充入渲染应用所需状态
       // 将状态附加到上下文，且 `template` 选项用于 renderer 时，
       // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
       context.state = store.state
       
       resolve(app)
      }).catch(reject)

    }, reject)

  })
}