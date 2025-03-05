<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div  class="goods-list">
      <GoodItems v-for="item in proList" :key="item.goods_id" :item="item"></GoodItems>
    </div>
  </div>
</template>
<script>
import GoodItems from '@/components/GoodItems.vue'
import { getProList } from '@/api/product' // 引入获取商品列表的接口
export default {
  name: 'ListIndex',
  components: {
    GoodItems
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search// 获取地址栏的搜索关键字,在地址栏中获取search的值,并赋值给querySearch
    }
  },
  async created () {
    const params = {
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    }
    const { data: { list } } = await getProList(params)
    // console.log(res)
    this.proList = list.data
  //   const { data: { list } } = await getProList({
  //     categoryId: this.$route.query.categoryId,
  //     goodsName: this.querySearch,
  //     page: this.page
  //   })
  //   this.proList = list.data
  },

  data () {
    return {
      page: 1,
      proList: []
    }
  }
}
</script>

  <style lang="less" scoped>
  .search {
    padding-top: 46px;
    ::v-deep .van-icon-arrow-left {
      color: #333;
    }
    .tool {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }

    .sort-btns {
      display: flex;
      height: 36px;
      line-height: 36px;
      .sort-item {
        text-align: center;
        flex: 1;
        font-size: 16px;
      }
    }
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
  </style>
