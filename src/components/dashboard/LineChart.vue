<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chart: null,
      chartTitle: ["播放量", '增长量'],
      chartX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({expectedData, actualData} = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.chartX,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          show: true,
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.chartTitle
        },
        series: [
          {
            name: this.chartTitle[0],
            smooth: false,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#1148D2FF',
                lineStyle: {
                  color: '#1148D2FF',
                  width: 2
                },
                areaStyle: {
                  color: 'rgba(17,72,210,0.1)'
                }
              }
            },
            symbol: 'none',
            smooth: true,
            data: actualData,
            animationDuration: 3000,
            animationEasing: 'quadraticOut'
          },
          {
            name: this.chartTitle[1],
            smooth: false,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#D21B46FF',
                lineStyle: {
                  color: '#D21B46FF',
                  width: 2
                },
                areaStyle: {
                  color: 'rgba(17,72,210,0.01)'
                }
              }
            },
            data: actualData,
            animationDuration: 3000,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
