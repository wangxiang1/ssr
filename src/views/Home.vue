<template>
  <div class="home">
    home page
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  asyncData({ store, route }) { // 约定预取逻辑编写在预取钩子asyncData中
    // 触发 action 后，返回 Promise 以便确定请求结果
    return store.dispatch("getCount");
  }
}
</script>
