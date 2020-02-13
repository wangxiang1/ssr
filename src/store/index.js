import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// store 工厂，给每一个用户请求创建独立状态管理器
export function createStore(){ 
  return new Vuex.Store({
    state: {
      count: 108
    },
    mutations: {
       // 加一个初始化
      init(state, count) {
        state.count = count;
      },

      increment(state){
        state.count++;
      }
    },
    getters: {
      doubleCount(state){
        return state.count * 2;
      }
    },
    actions: {
      getCount({commit}){
        // 加一个异步请求count的action
        return new Promise((resolve) => {
          setTimeout(() => {
            commit('init', Math.random() * 100)
            resolve()
          }, 1000);
        })
      },

      increment ({commit}) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }
  })
}
