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
        {id: 2, name: "热门", '--color': "rgba(0,0,0,1)", class: "icon-hotVideo", link: "/hotVideo",},
        {id: 3, name: "关注", '--color': "black", class: "icon-follow", link: "/follow"},
        {id: 4, name: "频道", '--color': "black", class: "icon-channel", link: "/channel",},
        {id: 5, name: "我的", '--color': "black", class: "icon-erciyuan", link: "/user",},
      ],
      tabsCenterList: [
        {id: 1, name: "直播", '--color': "red", class: "icon-live", link: "/index"},
        {id: 2, name: "放映厅", '--color': "black", class: "icon-vs", link: "/hotVideo",},
        {id: 3, name: "知识", '--color': "black", class: "icon-knowledge", link: "/follow"},
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
  padding: 0.1rem 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
