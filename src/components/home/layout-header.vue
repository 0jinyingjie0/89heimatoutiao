<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
      <!-- 左侧内容 -->
      <el-col class="left" :span="8">
          <i class="el-icon-s-fold"></i>
          <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧内容 -->
      <el-col class="right" :span="4">
          <el-row type="flex" justify="end">
              <img :src="userInfo.photo ? userInfo.photo: defaultImg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown @command='handle' class="right-text">
              <span>{{ userInfo.name }}</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">GIT地址</el-dropdown-item>
                  <el-dropdown-item command="lgout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          </el-row>

      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 用户信息
      userInfo: {
      },
      //   先把地址转换成变量
      defaultImg: require('../../assets/header.jpg')
    }
  },
  created () {
    let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
      console.log(result.data)
    })
  },
  methods: {
    handle (command) {
      // 区分点击的菜单项
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/0jinyingjie0/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
       height: 60px;
        .left {
             font-size: 18px;
             .title {
                 margin-left: 5px;
                 font-size: 16px;
                 color: #2c3e50;
             }
        }
        .right {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 15px;
            }
            .right-text {
                // width: 50px;
                span {
                    line-height: 50px;
                }
            }
        }
    }
</style>
