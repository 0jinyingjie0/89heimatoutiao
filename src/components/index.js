// 统一管理组件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import Bread from './common/bread'
import { quillEditor } from 'vue-quill-editor'
// import CoverImage from './publish/cover-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', Bread)
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    // Vue.component('cover-image', CoverImage) // 注册一个封面组件
  }
}
