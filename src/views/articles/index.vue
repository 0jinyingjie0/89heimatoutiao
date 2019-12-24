<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 三行内容 -->
    <el-row class="tool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="10">
        <el-row type="flex">
          <el-radio>全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio>待审核</el-radio>
          <el-radio>审核通过</el-radio>
          <el-radio>审核失败</el-radio>
        </el-row>
      </el-col>

      <el-radio-group></el-radio-group>
    </el-row>
    <el-row class="tool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select></el-select>
      </el-col>
    </el-row>
    <el-row class="tool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dateRange: []
      }
    }
  }
}
</script>

<style lang='less' scoped>
.articles {
  .tool {
    height: 60px;
    margin-left: 30px;
  }
}
</style>
