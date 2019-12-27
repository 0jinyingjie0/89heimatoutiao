<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img  @click="selectImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 放置一个分页组件 -->
      <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         @current-change="changePage"
         ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">2</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 9,
        total: 0
      }
    }
  },
  methods: {
    //   点击图片时触发
    selectImg (url) {
      // 子给父传值
      this.$emit('selectOneImg', url)
    },
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          // 获取全部数据
          collect: false,
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
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload {
  display: flex;
  justify-content: center;
  i {
    font-size: 50px;
    display: block;
    margin: 20px auto;
    padding: 60px;
    border: 1px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
