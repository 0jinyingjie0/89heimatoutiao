// 统一管理组件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import Bread from './common/bread'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', Bread)
  }
}
