<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
        <el-upload :http-request="uploadImg" :show-file-list="false">
            <el-butten type="primary">上传图片</el-butten>
        </el-upload>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="素材总数" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="row">
              <i class="el-icon-star-on r1"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="row">
              <!-- <i class="el-icon-star-on r1"></i>
              <i class="el-icon-delete-solid"></i>-->
            </el-row>
          </el-card>
        </div>
           <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认选中总数
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1, // 当前页码
        pageSize: 12, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true // 打开进度条
      let form = new FormData()
      form.append('image', params.file) // 添加文件到formData
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // formData数据
      }).then(result => {
        //   说明已经上传成功了一张图片
        this.loading = false // 关闭进度条
        this.getAllMaterial()
      })
    },
    //   切换分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAll()
    },
    // 切换tab事件
    changeTab () {
      this.getAll()
      this.page.currentPage = 1
    },
    //   获取所有素材
    getAll () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .row {
      width: 100%;
      height: 80px;
      font-size: 24px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .r1 {
        font-size: 30px;
      }
    }
  }
}
</style>
