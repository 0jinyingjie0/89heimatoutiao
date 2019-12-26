<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">上传内容</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form style="margin-left:30px" label-width="100px">
      <el-form-item label="标题">
        <el-input style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内存">
        <el-input style="width:60%" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group>
          <el-radio>单图</el-radio>
          <el-radio>三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
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
