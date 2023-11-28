<template>
  <div class="nav-right">
    <div class="flex-center dn-phone">
      <!--通知-->
      <el-popover :width="320" ref="noticePopover" trigger="hover">
        <template #reference>
          <div class="link-type cp" @mousemove="handleNoticeShow" @mouseleave="handleNoticeHide">
            <div class="flex-column icon-click cg plr10px">
              <el-badge :value="noticeCount" class="item">
                <div style="height: 20px; justify-content: center; width: 20px;">
                  <i class="iconfont icon-notice" style="font-size: 20px"></i>
                </div>
              </el-badge>
              <p>
                <span class="cg fs7">通知</span>
              </p>
            </div>
          </div>
        </template>
        <template #default>
          通知
          <!--          <Notice v-if="showNotice" @noticeRefreshEmit="emitNoticeRefresh"/>-->
        </template>
      </el-popover>
      <!-- 网址 -->
      <router-link class="link-type cp">
        <div class="flex-column icon-click cg plr10px">
          <div class="flex-center" style="height: 24px;width: 24px;">
            <i class="iconfont icon-message fs125"></i>
          </div>
          <p>
            <span class="cg fs7"></span>
          </p>
        </div>
      </router-link>
      <el-popover :width="320" ref="noticePopover" trigger="hover">
        <template #reference>
          <div class="link-type cp" @mousemove="handleNoticeShow" @mouseleave="handleNoticeHide">
            <div class="flex-column icon-click cg plr10px">
              <div class="flex-center" style="height: 24px; width: 24px;">
                <i class="iconfont icon-link fs125"></i>
              </div>
              <p>
                <span class="cg fs7">网址</span>
              </p>
            </div>
          </div>
        </template>
        <template #default>
          网址
          <!--          <Notice v-if="showNotice" @noticeRefreshEmit="emitNoticeRefresh"/>-->
        </template>
      </el-popover>
    </div>
    <router-link class="user-container" :to="'/user'">
      <el-avatar v-if="user.avatar" :src="user.avatar"/>
      <el-avatar v-else icon="el-icon-user-solid"/>
    </router-link>
  </div>
</template>

<script>
import {themeX} from "@/store/themeX";
import Notice from "@/components/nav/Notice.vue";
import {tokenX} from "@/store/tokenX";
import {userInfoX} from "@/store/userInfoX";
import {removeToken} from "@/utils/auth.js";

export default {
  name: "NavRight",
  components: {Notice},
  props: {
    user: Object,
  },
  data() {
    return {
      // 右侧导航栏
      rightNavList: [
        {id: 1, icon: "iconfont icon-notice", num: 2, title: "通知", url: "/notice"},
        {id: 2, icon: "iconfont icon-message", num: 0, title: "消息", url: "/message"},
        {id: 3, icon: "iconfont icon-upload", num: 0, title: "投稿", url: "/publish"},
      ],
      saveLogin: true, // 保存登录信息
      userPostInfo: [
        {id: 1, icon: "iconfont icon-videoPost", num: 0, title: "我的作品", url: "/user/videoPost"},
        {id: 2, icon: "iconfont icon-like-ed", num: 0, title: "我的喜欢", url: "/user/videoLike"},
        {id: 3, icon: "iconfont icon-favorite-ed", num: 0, title: "我的收藏", url: "/user/videoFavorite"},
        {id: 4, icon: "iconfont icon-history", num: 0, title: "观看历史", url: "/user/videoViewHistory"},
      ],
      showNotice: false,
      noticeCount: undefined,
      noticeCountQueryParams: {
        receiveFlag: "0"
      }
    }
  },
  created() {
    this.initTheme()
  },
  emits: ['darkChangeEmit'],
  mounted() {
    // this.$nextTick(()=> {
    //   this.$refs.noticePopover.updatePopper()
    // })
  },
  methods: {
    initTheme() {
      const html = document.querySelector('html')
      const dark = themeX().dark
      if (dark) {
        html.classList.remove("light")
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
        html.classList.add("light")
      }
    },

    // 用户popover的show时间
    handlePopoverShow() {
      // 封装用户作品量、喜欢量、收藏量
      myVideoCount().then(res => {
        if (res.code === 200) {
          this.userPostInfo.forEach((item, index) => {
            return item.id === 1 ? item.num = res.data : 0
          })
        }
      })
      myLikeCount().then(res => {
        if (res.code === 200) {
          this.userPostInfo.forEach((item, index) => {
            return item.id === 2 ? item.num = res.data : 0
          })
        }
      })
      myFavoriteCount().then(res => {
        if (res.code === 200) {
          this.userPostInfo.forEach((item, index) => {
            return item.id === 3 ? item.num = res.data : 0
          })
        }
      })
    },
    // 退出登录
    handleLogout() {
      tokenX().removeToken()
      userInfoX().removeUserInfo()
      removeToken()
      this.$router.push('/login');
    },
    // 主题切换，换肤功能
    handleThemeSwitch() {
      const html = document.querySelector('html')
      const dark = themeX().dark
      if (html) {
        this.$emit("darkChangeEmit", !dark)
        if (dark) {
          themeX().setDark(false)
          html.classList.remove("dark")
          html.classList.add("light")
        } else {
          themeX().setDark(true)
          html.classList.remove("light")
          html.classList.add("dark")
        }
      }
    },
    // 显示通知
    handleNoticeShow() {
      this.showNotice = true
    },
    // 通知弹框隐藏
    handleNoticeHide() {
      this.showNotice = true
    },
    // 接收子事件
    emitNoticeRefresh() {
      // this.initNotice()
    }
  }
}
</script>

<style scoped>
</style>
