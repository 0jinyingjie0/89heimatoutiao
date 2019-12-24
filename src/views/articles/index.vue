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
        <el-radio-group v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="tool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
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
    <!-- 主体 -->
    <el-row class="total">
      <span>共找到10条内容</span>
    </el-row>
    <el-row v-for="item in 10" :key="item" type="flex" justify="space-between" class="item-ar">
      <el-col :span="6">
        <el-row type="flex">
          <img src="../../assets/header.jpg" alt />
          <div class="info">
            <!-- 标题 -->
            <span>1</span>
            <!-- 种类标签 -->
            <el-tag class="tag">标签一</el-tag>
            <!-- 时间 -->
            <span class="date">2</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end" class="right">
          <span><i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </el-row>
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
      },
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.articles {
  .tool {
    height: 60px;
    margin-left: 30px;
  }
  .total {
    height: 60px;
    height:30px ;
  }
  .item-ar {
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px dashed #cccccc;
    img {
      width: 180px;
      height: 120px;
      margin-right: 20px;
    }
    .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tag {
            width: 60px;
        }
        .date {
            color: #999;
            font-size: 14px;
        }
    }
    .right {
        span {
            margin-left: 10px;
        }
    }
  }
}
</style>
