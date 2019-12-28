<template>
    <el-card v-loading="loading">
        <bread-crumb slot="header">
            <template slot="title"></template>
        </bread-crumb>
        <!-- 放置上传组件 -->
      <el-upload :http-request="uploadImg" class='head-upload' action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
      <!-- 放置组件 -->
        <el-form ref="myform" style="margin-top:60px" label-width="100px" :model="formData" :rules="rules">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="formData.name" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro">
                <el-input v-model="formData.intro" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="formData.mobile" disabled style="width:50%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
// 引入公共的实例
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      // 定义一个表单数据对象
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      //   定义规则
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      }, // 定义一个规则
      defaultImg: require('../../assets/header.jpg')
    }
  },
  methods: {
    //   上传组件
    async uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      //   设置头像地址
      this.formData.photo = result.data.photo
      this.loading = false
      eventBus.$emit('updateUserInfoSuccess')
    },
    //   保存信息
    async saveUserInfo () {
      // 校验表单数据
      await this.$refs.myform.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          })
          //   认为保存成功
          this.$message({
            type: 'success',
            message: '保存信息成功'
          })
          // 告诉头部更新
          eventBus.$emit('updateUserInfoSuccess')
        }
      })
    },
    //   获取用户信息
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
 .head-upload {
     position: absolute;
     right: 200px;
     img {
         width: 200px;
         height: 200px;
         border-radius: 50%;
     }
 }
</style>
