<template>
  <div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
      <img :src="item?item:defaultImg" alt />
    </div>
    <!-- 用visible控制显示或者隐藏 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <!-- 选择素材内容 -->
      <!-- 监听谁就在谁的标签上写事件 -->
      <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'), // 将图片变成变量
      selectIndex: -1 // 默认下标 -1
    }
  },
  props: ['list'],
  methods: {
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 100px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
