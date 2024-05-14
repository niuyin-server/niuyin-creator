<template>
  <!--  首页-->
  <div class="niuyin">
    <div class="bg-mask"></div>
    <el-container class="layout-container" style="height: 100vh">
      <Aside :siteTitle="siteTitle"></Aside>
      <el-container class="is-vertical">
        <Header/>
        <el-main>
          <!--路由-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "@/components/Aside.vue"
import Header from "@/components/Header.vue"

export default {
  name: 'Index',
  components: {Aside, Header},
  data() {
    return {
      siteTitle: "牛音创作者中心",
      videoUrl: undefined,
      niuyinTheme: "niuyin-light",
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {}

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/styles/index.scss";
</style>
