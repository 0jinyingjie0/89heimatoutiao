<template>
  <!-- 面包屑内容 -->
    <el-breadcrumb separator=">">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
         <el-breadcrumb-item >
             <slot name="title"></slot>
         </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
