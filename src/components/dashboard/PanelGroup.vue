<template>
  <el-row :gutter="8" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('playAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-video"></use>
            </svg>
            <h6 class="ml-5r">播放量</h6>
          </div>
          <div v-if="dashboardAmount.playAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.playAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.playAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.playAmount.add" :duration="3000" class="fs7 fw500"/>
          </span></div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('indexViewAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-amount-access"></use>
            </svg>
            <h6 class="ml-5r">主页访问量</h6>
          </div>
          <div v-if="dashboardAmount.indexViewAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.indexViewAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.indexViewAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.indexViewAmount.add" :duration="3000" class="fs7 fw500"/>
          </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('fansAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-amount-fans"></use>
            </svg>
            <h6 class="ml-5r">净增粉丝</h6>
          </div>
          <div v-if="dashboardAmount.fansAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.fansAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.fansAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.fansAmount.add" :duration="3000" class="fs7 fw500"/>
          </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('likeAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-amount-like"></use>
            </svg>
            <h6 class="ml-5r">作品点赞</h6>
          </div>
          <div v-if="dashboardAmount.likeAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.likeAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.likeAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.likeAmount.add" :duration="3000" class="fs7 fw500"/>
          </span>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('commentAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-amount-comment"></use>
            </svg>
            <h6 class="ml-5r">作品评论</h6>
          </div>
          <div v-if="dashboardAmount.commentAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.commentAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.commentAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.commentAmount.add" :duration="3000" class="fs7 fw500"/>
          </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shareAmount')">
        <div class="card-panel-description ml-5r">
          <div class="w100 mb5 flex-start">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-amount-share"></use>
            </svg>
            <h6 class="ml-5r">作品分享</h6>
          </div>
          <div v-if="dashboardAmount.shareAmount">
            <count-to :start-val="0" :end-val="dashboardAmount.shareAmount.now" :duration="3000" class="fw600"/>
            <span class="fs7 mlr5">较前7日</span>
            <span v-if="dashboardAmount.shareAmount.add===0" class="fs7 fw500">0</span>
            <span v-else style="color: var(---primary-red-color)">
            <span class="fs7 fw600">+</span>
            <count-to :start-val="0" :end-val="dashboardAmount.shareAmount.add" :duration="3000" class="fs7 fw500"/>
          </span>
          </div>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    dashboardAmount: {
      type: Object,
      default: {
        playAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        }, // now,add,gather
        indexViewAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        },
        fansAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        },
        likeAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        },
        commentAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        },
        shareAmount: {
          now: 0,
          add: 0,
          gather: [0, 0, 0, 0, 0, 0, 0]
        },
      },
    }
  },
  data() {
    return {}
  },
  components: {
    CountTo
  },
  created() {
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {

  .card-panel-col {
    margin-bottom: .5rem;
  }

  .card-panel {
    cursor: pointer;
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    transition: all .2s ease;

    &:hover {
      box-shadow: 1px 1px 5px 1px #0000001a;

      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-community {
        background: #36a3f7;
      }

      .icon-visit-people {
        background: #6857c7;
      }

    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-community {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      transition: all 0.3s ease-out;
      border-radius: 10px;
    }

  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
}
</style>
