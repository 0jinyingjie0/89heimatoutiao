<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title"></template>
        </bread-crumb>
        <!-- 放置上传组件 -->
      <el-upload  class='head-upload' action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
      <!-- 放置组件 -->
        <el-form style="margin-top:60px" label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="formData.name" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formData.mobile" disabled style="width:50%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >保存信息</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
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
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
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
