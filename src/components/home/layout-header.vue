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
              <img src="../../assets/header.jpg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown class="right-text">
              <span>靳小靳</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>GIT地址</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          </el-row>

      </el-col>
  </el-row>
</template>

<script>
export default {

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
                span {
                    line-height: 50px;
                }
            }
        }
    }
</style>
