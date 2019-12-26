<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">上传内容</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:30px" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input  v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
      <quill-editor style="height:400px;" v-model="formData.content"  ></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:100px">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publisharticle()">发布</el-button>
        <el-button @click="publisharticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 数据对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 默认无图
          images: []
        },
        channel_id: null
      },
      //   校验规则对象
      publishRules: {
        // 校验规则对象 min  max
        title: [{ required: true, message: '标题内容不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      },
      channels: []
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
      } else {
        // 没有参数  => 发布 // 没有参数  => 发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    },
    'formData.cover.type': function () {
      //  this指向组件实例
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 单图模式
      }
    }
  },
  methods: {
    //   获取文章详情
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    },
    //   发布文章
    publisharticle (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          console.log('成功')
          this.$refs.publishForm.validate((isOK) => {
            if (isOK) {
              let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
              //   修改和发布二合一
              this.$axios({
                method: articleId ? 'put' : 'post',
                url: articleId ? `/articles/${articleId}` : `/articles`,
                params: { draft }, // query参数
                data: this.formData
              }).then(result => {
                this.$router.push('/home/articles') // 回到内容列表
              })
              //   this.$axios({
              //     url: '/articles',
              //     method: 'post',
              //     params: { draft }, // query参数
              //     data: this.formData
              //   }).then(() => {
              //   // 新增成功 => 应该去内容列表
              //     this.$router.push('/home/articles') // 回到内容列表
              //   })
            }
          })
        }
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        //   获取频道数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    // 获取id 判断有无id  有id 就是修改 没id就是发布
    let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>
</style>
