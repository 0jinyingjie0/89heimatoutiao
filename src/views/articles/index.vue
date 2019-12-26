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
      <el-col :span="22">
        <el-radio-group  @change="changeCondition" v-model="formData.status">
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
        <el-select v-model="formData.channel_id" @change="changeCondition" >
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
         @change="changeCondition"
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
      <span>共找到{{page.total}}条内容</span>
    </el-row>
    <el-row v-for="item in list" :key="item.id.toString()" type="flex" justify="space-between" class="item-ar">
      <el-col :span="18">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0]:defaultimg" alt />
          <div class="info">
            <!-- 标题 -->
            <span>{{item.title}}</span>
            <!-- 种类标签 -->
            <el-tag :type="item.status|filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <!-- 时间 -->
            <span class="date">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end" class="right">
          <span @click="toModify(item.id)"><i class="el-icon-edit"></i>修改</span>
          <span><i @click="delArticle(item.id)" class="el-icon-delete"></i>删除</span>
        </el-row>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-row type='flex' justify="center" align="middle" style='height:60px'>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        >
        </el-pagination>
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
      channels: [], // 接收频道数据
      list: [], // 用来接收文章数据
      defaultimg: require('../../assets/header.jpg'),
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 文章列表最低10条
        total: 0
      }
    }
  },
  watch: {
    formData: {
      handler () {
        this.changeCondition()
      },
      deep: true
    }
  },
  filters: {
    // 处理显示状态
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 修改内容
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    delArticle (id) {
      // 所有已发布的文章是不可以删除的  只有草稿才可以删除
      this.$confirm('您是否要删除这个文章?').then(() => {
        // 直接删除
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功!'
          })
          // this.page.currentPage = 1 // 如果想回第一个页 就赋值 为1 否则不用管
          this.getConditionArticle() // 重新调用
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      // 赋值当前页码
      this.page.currentPage = newPage // 赋值当前页
      this.getConditionArticle()
    },
    changeCondition () {
      // 组装条件
      this.page.currentPage = 1 // 强制将当前的页码回到第一页
      // 最新状态
      this.getConditionArticle()
    },
    getConditionArticle () {
      if (this.formData.dateRange == null) {
        this.formData.dateRange = []
      }
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截止时间
      }
      this.getArticles(params)
    },
    //   获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        //   获取文章列表数据
        this.list = result.data.results
        // 获取文章总数
        this.page.total = result.data.total_count // 文章总数
      })
    },
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
    this.getArticles()
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
            cursor: pointer;
        }
    }
  }
}
</style>
