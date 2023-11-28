<template>
  <!--  侧边栏-->
  <el-aside class="niuyin-aside" :width="'160px'">
    <div>
      <!-- logo -->
      <div class="oh w100"
           style="overflow:hidden;height: 60px;position:sticky;top: 0;left: 0;z-index: 100;backdrop-filter: blur(10px)">
        <router-link class="link-type flex-center wh100" :to="'/'">
          <img style="width: 32px;height: 32px;display: inline-block" src="@/assets/logo/logo-niuyin-new.png">
          <span class="dn-phone" style="display:inline-block;line-height: 60px;height: 60px">{{ siteTitle }}</span>
        </router-link>
      </div>
      <!-- tab栏区域 -->
      <div class="tabs-area">
        <ul class="tab-top">
          <li class="tab-top-item">
            <router-link class="router-link" active-class="router-is-focus" to="/create">
              <div class="tab-item">
<!--                <div class="round">-->

<!--                </div>-->
<!--                <span class="dn-phone">发布作品</span>-->
                <el-button type="primary" style="" class="w100">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="tab-top">
          <li class="tab-top-item"
              v-for="(item, i) in tabsTopList"
              :key="i">
            <router-link class="router-link"
                         active-class="router-is-focus"
                         :to="item.link">
              <div class="tab-item">
                <div class="round">
                  <i class="iconfont" :class="item.class" :style="item"></i>
                </div>
                <span class="dn-phone">{{ item.name }}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <!-- 分隔符 -->
        <el-divider/>
        <ul class="tab-center">
          <li class="tab-center-item"
              v-for="(item, i) in tabsCenterList"
              :key="i">
            <router-link class="router-link"
                         active-class="router-is-focus"
                         :to="item.link">
              <div class="tab-item">
                <div class="round">
                  <i class="iconfont" :class="item.class" :style="item"></i>
                </div>
                <span class="dn-phone">{{ item.name }}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <!-- 分隔符 -->
        <el-divider/>
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
      tabsTopList: [
        {id: 1, name: "首页", '--color': "blue", class: "icon-index", link: "/"},
        {id: 2, name: "热门视频", '--color': "rgba(0,0,0,1)", class: "icon-hotVideo", link: "/hotVideo",},
      ],
      tabsCenterList: [
        {id: 1, name: "直播", '--color': "red", class: "icon-live", link: "/index"},
      ],
      tabsBottomList: [
        {id: 1, name: "商务合作", '--color': "red", class: "icon-index", link: "/index"},
      ],
    }
  },
  methods: {}
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

</style>
