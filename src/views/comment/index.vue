<template>
  <el-card class="el" v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>

    <el-table :data="list" style="position:relative">
      <el-table-column prop="title" width="777" label="标题"></el-table-column>
      <!-- 格式化状态 -->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="bottom" type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 设置加载状态，默认关闭
      loading: false,
      list: [],
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 10, // 默认每页多少条
        currentPage: 1 // 默认第一页
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.comment()
    },
    async comment () {
      // 打开时加载的状态
      let result = await this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      // 获取文章的总条数
      this.page.total = result.data.total_count
      // 设置加载状态
      this.loading = false
    },
    // 状态的布尔值转化方法
    formatterBool (row, column, cellValue) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论的方法
    async openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // 显示提示信息
      await this.$confirm(`您是否确定要${mess}评论吗`)
      // 调用接口，改变评论状态
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        // 对返回的id进行大数据处理
        params: {
          article_id: row.id.toString()
        },
        data: {
          allow_comment: !row.comment_status
        }
      })
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.comment()
    }
  },
  created () {
    // 调用接口，请求数据
    this.comment()
  }
}
</script>

<style lang='less' scoped>
.el {
  background: url(../../assets/header.jpg);
  background-size: cover;
}
// .bottom {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
// }
</style>
