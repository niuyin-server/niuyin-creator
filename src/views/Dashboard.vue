<template>
  <div class="dashboard-container">
    <!--    用户信息-->
    <div class="w100">
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
              <span class="fs8 link-gold ml2rem">发起授权</span></div>
            <div class="divide-grey">
              <span class="fs8">芝士号：</span>
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
            <div class="w50 plr10px cp">
              <router-link to="/publish" tag="div">
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
            <div class="w50 plr10px cp">
              <router-link to="/publish" tag="div">
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
            <!--            <div class="w33 plr10px cp">-->
            <!--              <router-link to="/publish" tag="div">-->
            <!--                <div class="upload-bg p1rem b-radius5 df">-->
            <!--                  <div class="flex-center">-->
            <!--                    <svg class="icon32" aria-hidden="true">-->
            <!--                      <use xlink:href="#icon-panoramic"></use>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                  <div class="ml-5r">-->
            <!--                    <p class="fs9 mb5 fw600">发布全景视频</p>-->
            <!--                    <p class="fs8 cg one-line">推荐分辨率为4K (3840x1920) 及以上</p>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </router-link>-->
            <!--            </div>-->
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
            <div class="fs8 cp cg">查看更多 ></div>
          </div>
          <div class="grid-2-8">
            <div>
              <h5 class="mb5">最新作品</h5>
              <div class="upload-bg p1rem b-radius5 tac">
                <div class="tac">
                  <img class="wh80px"
                       src="//lf6-cdn-tos.bytescm.com/obj/static/douyin_creator/fe/pc/static/image/empty-work.7069cf23.png"
                       alt=""/>
                  <p class="fs8 cg">数据统计中...</p>
                </div>
              </div>
            </div>
            <div>
              <h5 class="mb5">数据总览</h5>
              <div class="upload-bg p1rem b-radius5">
                <div class="post-like-view">
                  <el-row>
                    <line-chart :chart-data="lineChartData"/>
                  </el-row>
                </div>
                <div class="post-sun-view">
                  <!--                <div class="post-sun-view flex-between">-->
                  <!--                  <div v-for="item in 6" class="w33" style="padding: 0 8px 8px">-->
                  <!--                    <div class="pd-href-rem brd-href-rem upload-bg">-->
                  <!--                      <h6 class="mb5">播放量</h6>-->
                  <!--                      <div class="flex-start">-->
                  <!--                        <h4>40</h4>-->
                  <!--                        <span class="fs7 mlr5">较前7日</span>-->
                  <!--                        <span class="fs7">0</span>-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <panel-group :dashboard-amount="dashboardAmount" @handleSetLineChartData="handleSetLineChartData"/>
                </div>


                <!--                <div class="df">-->
                <!--                  <div>-->
                <!--                    <img class="wh80px"-->
                <!--                         src="//lf6-cdn-tos.bytescm.com/obj/static/douyin_creator/fe/pc/static/image/success.86c375fe.png">-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </div>
          </div>
        </el-card>
        <!--    收入概况-->
        <!--        <el-card class="mb1rem">-->
        <!--          <div class="flex-between mb5">-->
        <!--            <div class="flex-start">-->
        <!--              <h4>收入概况</h4>-->
        <!--              <div class="ml-5r fs8 cp">-->
        <!--                <i class="el-icon-view"></i>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="fs8 cp cg">查看详情 ></div>-->
        <!--          </div>-->
        <!--          <div class="flex-between">-->
        <!--            <div v-for="item in 3" class="w33" style="padding: 0 4px 8px">-->
        <!--              <div class="pd-href-rem brd-href-rem upload-bg">-->
        <!--                <div class="flex-column">-->
        <!--                  <h6 class="mb5">-->
        <!--                    <span>昨日</span><span class="ml-5r">12-8</span>-->
        <!--                  </h6>-->
        <!--                </div>-->
        <!--                <div class="flex-start">-->
        <!--                  <h6>￥</h6>-->
        <!--                  <h4>0.00</h4>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </el-card>-->
        <!--    创作中心-->
        <el-card class="mb1rem">
          <div class="flex-between mb5">
            <div class="flex-start">
              <h4>创作中心</h4>
              <!--              <div class="ml-5r fs8 cp">-->
              <!--                <i class="el-icon-view"></i>-->
              <!--              </div>-->
            </div>
            <!--            <div class="fs8 cp cg">查看详情 ></div>-->
          </div>
          <!--          <div class="flex-between">-->
          <!--            <div v-for="item in 3" class="w33" style="padding: 0 4px 8px">-->
          <!--              <div class="pd-href-rem brd-href-rem">-->
          <!--                <el-tabs v-model="activeName" @tab-click="handleTabClick">-->
          <!--                  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
          <!--                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
          <!--                </el-tabs>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </el-card>
      </div>
      <div>
        <!--           创作者平台广告位招租轮播图-->
        <el-card class="mb1rem">
          <div class="mb5">
            <el-carousel trigger="click" height="150px">
              <el-carousel-item class="cul-bg" v-for="item in culItem" :key="item.id"
                                :style="{ backgroundImage: `url(${item.image})` }">
                <!--                  <div :style="{ backgroundImage: `url(${item.image})` }"></div>-->
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="one-line fs8 fw500">芝士创作服务平台·致力于全面的服务</div>
        </el-card>
        <!--          活动中心-->
        <el-card class="mb1rem">
          <div class="flex-between mb5">
            <h4>活动中心</h4>
            <span class="fs8 cp cg">查看更多 ></span>
          </div>
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                slot="dateCell"
                slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1)[1] }} {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {userInfoX} from "@/store/userInfoX";
import {followAndFans} from "@/api/social.js";
import {userLikeNums} from "@/api/video.js";
import {parseTime} from "@/utils/roydon";
import PanelGroup from '@/components/dashboard/PanelGroup'
import LineChart from '@/components/dashboard/LineChart'
import RaddarChart from '@/components/dashboard/RaddarChart'
import PieChart from '@/components/dashboard/PieChart'
import BarChart from '@/components/dashboard/BarChart'
import {dashboardAmount} from "@/api/creator";
import {getInfo} from "@/api/member";

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      user: userInfoX().userInfo,
      followNum: 0, // 关注数
      fansNum: 0, //粉丝数
      likeAllNum: 0, //获赞数
      culItem: [
        {
          id: 1,
          title: '芝士创作服务平台·致力于全面的服务',
          image: "https://cdn.pixabay.com/photo/2023/08/21/03/34/droplets-8203505_640.jpg"
        },
        {
          id: 2,
          title: '芝士创作服务平台·致力于全面的服务',
          image: "https://cdn.pixabay.com/photo/2017/08/07/08/23/sea-2601374_640.jpg"
        }
      ],
      lineChartDataGather: {
        playAmount: {
          actualData: []
        },
        indexViewAmount: {
          actualData: []
        },
        fansAmount: {
          actualData: []
        },
        likeAmount: {
          actualData: []
        },
        commentAmount: {
          actualData: []
        },
        shareAmount: {
          actualData: []
        }
      },
      lineChartData: {},
      activeName: "first",
      dashboardAmount: {},
    }
  },
  created() {
    this.roydonLog()
  },
  mounted() {
    this.getUserInfo()
    // this.getUserFollowFansLike()
    this.initDashboardAmount()
  },
  methods: {
    parseTime,
    // 获取用户信息
    getUserInfo() {
      getInfo().then(res => {
        if (res.code === 200) {
          this.user = res.data
          this.getUserFollowFansLike()
          // userInfoX().setUserInfo(res.data)
        }
      })
    },
    getUserFollowFansLike() {
      console.log(this.user)
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
    initDashboardAmount() {
      dashboardAmount().then(res => {
        if (res.code === 200) {
          this.dashboardAmount = res.data
          const {
            playAmount: {gather: playGather},
            indexViewAmount: {gather: indexGather},
            fansAmount: {gather: fansGather},
            likeAmount: {gather: likeGather},
            commentAmount: {gather: commentGather},
            shareAmount: {gather: shareGather}
          } = res.data;
          this.lineChartDataGather.playAmount.actualData = playGather
          this.lineChartDataGather.indexViewAmount.actualData = indexGather
          this.lineChartDataGather.fansAmount.actualData = fansGather
          this.lineChartDataGather.likeAmount.actualData = likeGather
          this.lineChartDataGather.commentAmount.actualData = commentGather
          this.lineChartDataGather.shareAmount.actualData = shareGather
          this.lineChartData = this.lineChartDataGather.playAmount
        }
      })
    }
    ,
    handleSetLineChartData(type) {
      this.lineChartData = this.lineChartDataGather[type]
    }
    ,
    handleTabClick(tab, event) {
      console.log(tab, event);
    }
    ,
    roydonLog() {
      console.log(
          "%croydon",
          "background-color: gold; color: pink;text-shadow: 1px 0 1px black ; font-weight: bolder ; border-radius: 10px;font-size: 32px ;padding: 10px 100px;"
      );
      console.log(
          "%cniuyin-creator",
          "background-color: pink;color: white; font-weight: bold;border-radius: 6px;" +
          "font-size: 16px;font-style: italic;text-decoration: underline;" +
          "font-family:'american typewriter';text-shadow: 1px 2px 3px black;"
      );
      console.group(
          "%cniuyin-creator",
          "background-color: #e0005a;color: #ffffff ;font-weight: bold;padding: 4px ;"
      );
      console.log("version: 1.0.1");
      console.groupEnd();

    }
    ,
  }
}

</script>

<style scoped>
@import "@/assets/styles/user.scss";

.dashboard-container {
  padding: 0 1rem;
}

:deep(.el-tabs__item) {
  padding: 0 8px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.cul-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
