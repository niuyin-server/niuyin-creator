<template>
  <div>
    <div>
      <div class="pr" style="border: 1px solid #cccccc">
        <!-- //搜索框 -->
        <!--        <el-amap-search-box-->
        <!--            id="search"-->
        <!--            :search-option="searchOption"-->
        <!--            :on-search-result="onSearchResult"/>-->
        <!-- 地图 -->
        <el-amap
            class="amap-box"
            :zoom="amap.zoom"
            :center="amap.center"
            :plugin="amap.plugin"
            :events="amap.events">
          <!-- 当前位置图标 -->
          <el-amap-marker
              v-for="(marker, index) in amap.markers"
              :key="'marker' + index"
              :position="marker.position"/>
          <!-- 位置名称显示 -->
          <el-amap-text
              v-for="(marker, index) in amap.markers"
              :key="'text' + index"
              :text="marker.text"
              :offset="marker.offset"
              :position="marker.position"/>
        </el-amap>
        <div class="amap-dialog cb" v-if="addressResult.address">
          <h5>{{ amap.center }}</h5>
          <h6>{{ addressResult.address }}</h6>
        </div>
        <div class="amap-button" v-if="addressDialog">
          <el-button type="primary" @click="handleSelectAddress">选择此地址</el-button>
<!--          <h6>{{ emitLocation.address }}</h6>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//初始数据
function getFormData() {
  return {
    lat: "39.909186",
    lon: "116.39746",
    orgAddr: "天安门",
    province: "",
    city: "",
    district: "",
  };
}

export default {
  name: "MapView",
  data() {
    const vm = this;
    return {
      // form对象
      dataForm: getFormData(),
      // 地图搜索对象
      searchOption: {
        city: "全国",
        citylimit: true,
      },
      lng: 0,
      lat: 0,
      // 地图对象
      amap: {
        zoom: 16,
        center: [116.319802, 39.98294],
        events: {
          // 点击获取地址的数据
          click(e) {
            const {lng, lat} = e.lnglat;
            vm.dataForm.lon = lng;
            vm.dataForm.lat = lat;
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 100,
              extensions: "all",
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === "complete" && result.info === "OK") {
                if (result && result.regeocode) {
                  // console.log("点击获取地址的数据", result);
                  vm.dataForm.orgAddr = result.regeocode.formattedAddress;
                  vm.dataForm.province = result.regeocode.addressComponent.province;
                  vm.dataForm.city = result.regeocode.addressComponent.city;
                  vm.dataForm.cityCode = result.regeocode.addressComponent.citycode;
                  vm.dataForm.district = result.regeocode.addressComponent.district;
                  vm.dataForm.township = result.regeocode.addressComponent.township;
                  vm.dataForm.adcode = result.regeocode.addressComponent.adcode;
                  vm.dataForm.lat = lat ? lat.toString() : "";
                  vm.dataForm.lon = lng ? lng.toString() : "";
                  vm.amap.markers = [];
                  const obj = {
                    position: [lng, lat],
                    text: result.regeocode.formattedAddress,
                    offset: [0, 30],
                  };
                  vm.amap.markers.push(obj);
                  vm.sure();
                }
              }
            });
            vm.$nextTick();
          },
        },

        plugin: [
          {
            // 定位
            pName: "Geolocation",
            events: {
              init(o) {
                // o是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  // console.log("定位：", result);
                  if (result && result.position) {
                    // 设置经度
                    // console.log(result)
                    vm.dataForm.lon = result.position.lng
                    vm.dataForm.lat = result.position.lat;
                    vm.dataForm.orgAddr = result.formattedAddress;
                    vm.dataForm.adcode = result.addressComponent.adcode;
                    vm.dataForm.province = result.addressComponent.province;
                    vm.dataForm.city = result.addressComponent.city;
                    vm.dataForm.cityCode = result.addressComponent.citycode;
                    vm.dataForm.district = result.addressComponent.district;
                    vm.dataForm.township = result.addressComponent.township;
                    vm.lng = result.position.lng;
                    // 设置维度
                    vm.lat = result.position.lat;
                    // 设置坐标
                    vm.amap.center = [vm.lng, vm.lat];
                    let op = {
                      position: [vm.lng, vm.lat],
                      text: result.formattedAddress,
                      offset: [0, 10],
                    };
                    vm.amap.markers.push(op);
                    // 页面渲染好后
                    vm.$nextTick();
                    vm.sure();
                  }
                });
              },
            },
          },
        ],
        //
        markers: [],
      },
      addressResult: {
        longitude: null, //经度
        latitude: null, //纬度
        address: '', //完整地址
        adcode: null, //编码
        province: null,
        city: null,
        cityCode: null,
        district: null,
        township: null,
      },
      emitLocation: {},
      addressDialog: false,
    };
  },
  created() {
  },
  methods: {
    // 地图搜索回调
    onSearchResult(pois) {
      const vm = this;
      vm.amap.markers = [];
      let latSum = 0;
      let lngSum = 0;
      // console.log("地图回调", pois);
      if (pois.length > 0) {
        pois.forEach((poi, index) => {
          const {lng, lat} = poi;
          if (index === 0) {
            lngSum = lng;
            latSum = lat;
            const obj = {
              position: [poi.lng, poi.lat],
              text: poi.name,
              offset: [0, 30],
            };
            vm.amap.markers.push(obj);
            // console.log("地图搜索回调", poi);
            vm.dataForm.orgAddr = poi.name;
            vm.dataForm.lat = poi.lat ? poi.lat.toString() : "";
            vm.dataForm.lon = poi.lng ? poi.lng.toString() : "";
          }
        });
        vm.amap.center = [lngSum, latSum];
      }
    },
    // 提交方法
    sure() {
      const vm = this;
      // console.log(this.amap.markers);
      // console.log(vm.dataForm)
      // const addressResult = {
      //   longitude: null, //经度
      //   latitude: null, //纬度
      //   address: '', //完整地址
      //   adcode: null, //编码
      //   province: null,
      //   city: null,
      //   cityCode: null,
      //   district: null,
      //   township: null,
      // }
      this.addressResult.longitude = vm.dataForm.lon;
      this.addressResult.latitude = vm.dataForm.lat;
      this.addressResult.address = vm.dataForm.orgAddr;
      this.addressResult.adcode = vm.dataForm.adcode;
      this.addressResult.province = vm.dataForm.province;
      this.addressResult.city = vm.dataForm.city;
      this.addressResult.cityCode = vm.dataForm.cityCode;
      this.addressResult.district = vm.dataForm.district;
      this.addressResult.township = vm.dataForm.township;

      // console.log(this.addressResult)
      this.addressDialog = true

    },
    handleSelectAddress() {
      this.emitLocation = this.addressResult
      this.$emit("updateLocation", this.emitLocation);
    },
  },
};
</script>

<style lang="scss" scoped>
.amap-box {
  height: 42vh;
  border-radius: 1rem;
  overflow: hidden;
}

.el-vue-search-box-container {
  // top: 45px;
  width: 100% !important;
}

.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box .el-input {
  float: left;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0 7px 7px 0;
  outline: none;
  position: relative;
}

.search-box .el-button {
  position: absolute;
  right: 0;
  top: 1px;
  width: 20%;
  background: #38a28a;
  border-radius: 0 7px 7px 0;
  border: none;
  color: #fff;
  outline: none;
}

.tip-box {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 35px;
  padding: 10px 0;
  background-color: #fff;
  opacity: 0.8;
}

.amap-dialog {
  position: absolute;
  left: 50%;
  top: 16px;
  text-align: center;
  padding: 0.5rem;
  transform: translate(-50%, 0);
  background-color: rgba(242, 242, 243, 0.5) !important;
  border-radius: 0.5rem !important;
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.133) 0 1.6px 3.6px 0, rgba(0, 0, 0, 0.11) 0 0.3px 0.9px 0;
}

.amap-button {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  text-align: center;
  padding: 0.5rem;
  transform: translate(-50%, 0);
  background-color: rgba(242, 242, 243, 0.5) !important;
  border-radius: 0.5rem !important;
  backdrop-filter: blur(10px);
}
</style>
