<template>
  <el-container>
    <!-- 先左右布局 -->
    <el-aside style="background-color:#353b4e;min-height:100vh;width:230px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧布局 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>

</style>
