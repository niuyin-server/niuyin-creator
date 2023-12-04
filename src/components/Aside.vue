<template>
  <!--  侧边栏-->
  <el-aside class="niuyin-aside" :width="'200px'">
    <div>
      <!-- logo -->
      <div class="oh w100"
           style="overflow:hidden;height: 60px;position:sticky;top: 0;left: 0;z-index: 100;backdrop-filter: blur(10px)">
        <router-link class="link-type flex-center wh100" to="/">
          <img style="width: 32px;height: 32px;display: inline-block" src="@/assets/logo/logo-niuyin-new.png">
          <span class="dn-phone" style="display:inline-block;line-height: 60px;height: 60px">{{ siteTitle }}</span>
        </router-link>
      </div>
      <!-- tab栏区域 -->
      <div class="tabs-area">
        <div class="tab-publish flex-center">
          <router-link class="router-link-div" active-class="router-is-focus" to="/publish" tag="div">
            <div class="tab-item-btn">
              <el-button type="primary" class="w100">
                <div class="flex-center">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-publish"></use>
                  </svg>
                  <span class="dn-phone mlr5 fs9 fw600">发布作品</span>
                  <i class="el-icon-arrow-right el-icon-caret-bottom"/></div>
              </el-button>
            </div>
          </router-link>
        </div>
        <el-menu class="el-menu-vertical"
                 default-active="/"
                 router
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleSelect">
          <div v-for="item in menuList" :key="item.id">
            <div v-if="item.link">
              <el-menu-item :index="item.link">
                <div class="flex-start">
                  <svg class="icon mr-5r" aria-hidden="true">
                    <use :xlink:href="item.class"></use>
                  </svg>
                  <span slot="title">{{ item.name }}</span></div>
              </el-menu-item>
            </div>
            <div v-else>
              <el-submenu :index="item.id+''">
                <template slot="title">
                  <div class="flex-start">
                    <svg class="icon mr-5r" aria-hidden="true">
                      <use :xlink:href="item.class"></use>
                    </svg>
                    <span>{{ item.name }}</span></div>
                </template>
                <div v-for="ite in item.child" :key="ite.id">
                  <el-menu-item :index="ite.link">
                    <div class="flex-start">
                      <svg class="icon mr-5r" aria-hidden="true">
                        <use :xlink:href="ite.class"></use>
                      </svg>
                      <span slot="title">{{ ite.name }}</span></div>
                  </el-menu-item>
                </div>
              </el-submenu>
            </div>
          </div>
        </el-menu>
        <!-- 分隔符 -->
        <!--        <el-divider/>-->
      </div>
    </div>
  </el-aside>
</template>

<script>

export default {
  name: "Aside",
  props: {
    siteTitle: String,
  },
  data() {
    return {
      menuList: [
        {id: 0, name: "首页", class: "#icon-index", link: "/"},
        {
          id: 1, name: "内容管理", class: "#icon-content",
          child: [
            {id: 11, name: "作品管理", class: "#icon-post-video", link: "/content/post"},
            {id: 12, name: "合集管理", class: "#icon-content-compilation", link: "/content/compilation"},
          ]
        },
        {
          id: 2, name: "互动管理", class: "#icon-interact",
          child: [
            {id: 21, name: "关注管理", class: "#icon-attention", link: "/interact/follow"},
            {id: 22, name: "粉丝管理", class: "#icon-fans", link: "/interact/fans"},
          ]
        },
      ],
      tabsBottomList: [
        {id: 1, name: "商务合作", class: "icon-index", link: "/index"},
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      // console.log(this.$router.options.routes)
    }
  }
}
</script>

<style>
.niuyin-aside {
}

@media (max-width: 500px) {
  .niuyin-aside {
    width: 60px;
  }
}

.tab-top-item {
  width: 100%;
  margin: 0.3rem 0;
  text-align: left;
  font-size: 0.9rem;
  border-radius: 0.5rem;
}

.tab-center-item {
  width: 100%;
  margin: 0.3rem 0;
  text-align: left;
  font-size: 0.9rem;
  border-radius: 0.5rem;
}

.router-link {
  border-radius: 0.5rem;
  padding: 0.3rem 0;
  text-decoration: none;
}

.tab-item {
  margin: 1px 1rem;
  display: flex;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-radius: 0.5rem;
  transition: all .3s ease-in;
}

.tab-item:hover {
  background-color: rgba(37, 38, 50, .08);
}

.round {
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
}

.round i {
  border-radius: 50%;
  padding: 5px;
  font-size: 20px;
}


.tab-item-btn {
  margin: 1px 1rem;
  display: flex;
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  transition: all .3s ease-in;
}
</style>
