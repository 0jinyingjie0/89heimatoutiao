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
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader

  }
}
</script>

<style>
</style>
