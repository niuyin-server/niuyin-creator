<template>
  <div class="dashboard-container">
    <el-scrollbar>
      <!--    用户信息-->
      <div>
        <div class="user-dashboard">
          <div class="avatar-area dn-phone">
            <el-avatar v-if="user.avatar" class="user-avatar pr" :src="user.avatar"/>
            <el-avatar v-else class="user-avatar pr" icon="el-icon-user-solid"/>
            <div class="image-dot"></div>
          </div>
          <div class="user-info">
            <div class="username pr">
              <div class="divide-grey">
                <span class="fs9 fw600">{{ user.nickName }}</span>
                <span class="fs8" style="margin-left: 32px">发起授权</span></div>
              <div class="divide-grey">
                <span class="fs8">牛音号：</span>
                <span class="fs8">{{ user.userId }}</span>
              </div>
              <div class="">
                <span class="fs8">{{ user.memberInfo.description }}</span>
              </div>
            </div>
            <div class="follow-fans-like">
              <div class="user-info-follow flex-center">
                <div class="mr-5r cg fs8">关注</div>
                <div class="follow-right fw600">{{ followNum }}</div>
              </div>
              <div class="=user-info-fans flex-center">
                <div class="mr-5r cg fs8">粉丝</div>
                <div class="follow-right fw600">{{ fansNum }}</div>
              </div>
              <div class="user-info-like flex-center">
                <div class="mr-5r cg fs8">获赞</div>
                <div class="fw600">{{ likeAllNum }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    视频区域-->
      <div class="w100 grid-3-1">
        <div>
          <!--    新的创作-->
          <el-card class="mb1rem">
            <h4 class="mb5">新的创作</h4>
            <div class="flex-between">
              <div class="w33 plr10px cp">
                <router-link to="/" tag="div">
                  <div class="upload-bg p1rem b-radius5 df">
                    <div class="flex-center">
                      <svg class="icon32" aria-hidden="true">
                        <use xlink:href="#icon-video"></use>
                      </svg>
                    </div>
                    <div class="ml-5r">
                      <p class="fs9 mb5 fw600">发布视频</p>
                      <p class="fs8 cg one-line">支持常用格式，推荐mp4、webm</p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="w33 plr10px cp">
                <router-link to="/" tag="div">
                  <div class="upload-bg p1rem b-radius5 df">
                    <div class="flex-center">
                      <svg class="icon32" aria-hidden="true">
                        <use xlink:href="#icon-tuwen"></use>
                      </svg>
                    </div>
                    <div class="ml-5r">
                      <p class="fs9 mb5 fw600">发布图文</p>
                      <p class="fs8 cg one-line">支持常用图片格式，png、jpg</p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="w33 plr10px cp">
                <router-link to="/" tag="div">
                  <div class="upload-bg p1rem b-radius5 df">
                    <div class="flex-center">
                      <svg class="icon32" aria-hidden="true">
                        <use xlink:href="#icon-panoramic"></use>
                      </svg>
                    </div>
                    <div class="ml-5r">
                      <p class="fs9 mb5 fw600">发布全景视频</p>
                      <p class="fs8 cg one-line">推荐分辨率为4K (3840x1920) 及以上</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </el-card>
          <!--    数据中心-->
          <el-card class="mb1rem">
            <div class="flex-between mb5">
              <div class="flex-start">
                <h4>数据中心</h4>
                <div class="ml-5r fs8">
                  <span>统计周期：</span>
                  <span>{{ parseTime(new Date()) }}</span>
                  <span>（每天10点更新）</span>
                </div>
              </div>
              <div class="fs8 cp">查看更多 ></div>
            </div>
            <div class="grid-1-3">
              <div>
                <h5 class="mb5">最新作品</h5>
                <div class="upload-bg p1rem b-radius5 df">
                  <div>
                    <img class="wh80px"
                         src="//lf6-cdn-tos.bytescm.com/obj/static/douyin_creator/fe/pc/static/image/empty-work.7069cf23.png"/>
                  </div>
                </div>
              </div>
              <div>
                <h5 class="mb5">数据总览</h5>
                <div class="upload-bg p1rem b-radius5 df">
                  <div>
                    <img class="wh80px"
                         src="//lf6-cdn-tos.bytescm.com/obj/static/douyin_creator/fe/pc/static/image/success.86c375fe.png">
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <!--           创作者平台广告位招租轮播图-->
          <el-card>
            <el-carousel trigger="click" height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {followAndFans} from "@/api/social.js";
import {userLikeNums} from "@/api/video.js";
import {userInfoX} from "@/store/userInfoX";
import {parseTime} from "../utils/roydon";

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      user: userInfoX().userInfo,
      followNum: 0, // 关注数
      fansNum: 0, //粉丝数
      likeAllNum: 0, //获赞数
    }
  },
  created() {
    this.getUserFollowFansLike()
  },
  mounted() {
  },
  methods: {
    parseTime,
    getUserFollowFansLike() {
      // 查询关注、粉丝
      followAndFans(this.user.userId).then(res => {
        if (res.code === 200) {
          this.followNum = res.data.followedNums
          this.fansNum = res.data.fanNums
        }
      })
      // 查询获赞
      userLikeNums(this.user.userId).then(res => {
        if (res.code === 200) {
          this.likeAllNum = res.data
        }
      })
    },
  }
}

</script>

<style scoped>
@import "@/assets/styles/user.scss";

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
