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
        <el-input v-model="formData.content" style="width:60%" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="type">
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
        <el-button type="primary" @click="publisharticle">发布</el-button>
        <el-button @click="publisharticle">存入草稿</el-button>
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
  methods: {
    //   发布文章
    publisharticle () {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          console.log('成功')
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
  }
}
</script>

<style>
</style>
