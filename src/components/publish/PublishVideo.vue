<template>
  <div class="" style="padding-bottom: 2rem" ref="ruleForm">
    <div class="flex-between pr">
      <div class="w50">
        <div>
          <h4>作品标题</h4>
          <el-input class="mtb5"
                    v-model="videoForm.videoTitle"
                    type="text"
                    maxlength="100"
                    show-word-limit
                    placeholder="添加标题"/>
        </div>
        <div class="mtb5">
          <h4>作品简介</h4>
          <el-input class="mtb5"
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                    v-model="videoForm.videoDesc"/>
        </div>
        <div class="mtb5">
          <h4>添加标签</h4>
          <div class="mtb5">
            <el-tag v-for="item in videoTags"
                    :key="item.tag"
                    class="mx-1 mr-5r"
                    effect="dark"
                    round
                    closable
                    @close="handleTagClose(item)">
              {{ item.tag }}
            </el-tag>
            <el-input
                v-if="tagInputVisible"
                ref="RefTagInput"
                v-model="tagInputValue"
                class="ml-1 w100p mtb5"
                @keyup.enter.native="handleInputConfirm"/>
            <el-button v-else class="button-new-tag" v-show="tagBtn" size="small" @click="showTagInput">
              + 标签
            </el-button>
          </div>
          <p class="cg fs7">提示：添加标签有助于后台进行筛选推送，最多支持添加5个标签</p>
        </div>
        <div class="mtb5">
          <h4>选择分类</h4>
          <div class="mtb5">
            <el-cascader v-model="videoForm.categoryId"
                         class="w100"
                         :options="categoryList"
                         clearable
                         filterable
                         :props="{label:'name',value:'id',children:'children',expandTrigger: 'hover' }"
                         placeholder="试试搜索：理学">
            </el-cascader>
          </div>
        </div>
        <div class="mtb5">
          <h4>封面设置</h4>
          <div class="mtb5 grid-1-3">
            <div class="w100">
              <el-upload
                  class="cover-uploader wh100"
                  :action="coverImageUploadUrl"
                  :headers="headers"
                  :show-file-list="false"
                  :limit="1"
                  :on-success="handleCoverImageSuccess"
                  :before-upload="beforeCoverImagerUpload">
                <img v-if="videoForm.coverImage" :src="videoForm.coverImage" class="avatar" alt=""/>
                <i v-else class="uploader-icon el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="upload-container w100">
              <el-upload class="uploader"
                         drag
                         :show-file-list="false"
                         :action="videoUploadUrl"
                         :headers="headers"
                         :limit="1"
                         :disabled="!uploadVideoFlag"
                         v-loading="loading"
                         :on-success="handleVideoSuccess"
                         :before-upload="beforeUploadVideo"
                         :on-progress="uploadVideoProcess">
                <div v-if="uploadVideoFlag">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <div class="mtb5 fw600"><em>点击上传 或 将视频拖拽入此区域</em></div>
                    <p class="cg fs8 two-line">
                      为了更好的观看体验和平台安全，平台将对上传的视频预审。超过40秒的视频建议上传横版视频</p>
                  </div>
                </div>
                <div v-else style="margin: 40px auto 0">
                  <svg class="icon64" aria-hidden="true">
                    <use xlink:href="#icon-guide-success"></use>
                  </svg>
                  <div class="mtb5 fw600"><em>上传成功</em></div>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="flex-between">
            <p class="cg fs7">提示：优质的封面会极大增加同城曝光</p>
            <el-popover
                placement="right-end"
                width="400"
                trigger="hover">
              <div class="cover-example">
                <div class="flex-between mb5">
                  <h4 class="mb5">优质封面示例</h4>
                  <p class="fs7 cl-gold cp">制作技巧及示例 ></p>
                </div>
                <div class="success-example flex-between">
                  <div v-for="item in successExample" class="w33" style="padding: 0 5px 5px" :key="item.id">
                    <div class="tac">
                      <img :src="item.cover" class="b-radius1" style="height: 120px;width: 80px"></div>
                    <div>
                      <div>
                        <p class="two-line fs7">
                          <svg class="icon1rem" aria-hidden="true">
                            <use xlink:href="#icon-guide-success"></use>
                          </svg>
                          {{ item.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fail-example flex-between">
                  <div v-for="item in failExample" class="w33" style="padding: 0 5px 5px" :key="item.id">
                    <div class="tac">
                      <img :src="item.cover" class="b-radius1" style="height: 120px;width: 80px"></div>
                    <div>
                      <div>
                        <p class="two-line fs7">
                          <svg class="icon1rem" aria-hidden="true">
                            <use xlink:href="#icon-guide-faild"></use>
                          </svg>
                          {{ item.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p slot="reference" class="fs8 fw500 cl-gold cp">优秀封面示例</p>
              <!--              <el-button >click 激活</el-button>-->
            </el-popover>
          </div>
        </div>

        <div class="flex-between ptb10px">
          <div class="w33 p10px">
            <div class="upload-bg p1rem b-radius5">
              <p class="mb5 fw600 one-line fs8">视频格式</p>
              <p class="fs7 cg one-line">支持常用图片格式，暂不支持gif格式</p>
            </div>
          </div>
          <div class="w33 p10px">
            <div class="upload-bg p1rem b-radius5">
              <p class="mb5 fw600 one-line fs8">视频大小</p>
              <p class="fs7 cg one-line">图片大小不超过200MB</p>
            </div>
          </div>
          <div class="w33 p10px">
            <div class="upload-bg p1rem b-radius5">
              <p class="mb5 fw600 one-line fs8">视频比例</p>
              <p class="fs7 cg one-line">推荐视频分辨率1080p，画面比例16：9</p>
            </div>
          </div>
        </div>
        <div class="mtb5">
          <h4>添加到合集</h4>
          <div class="mtb5 grid-1-3">
            <div class="">
              <el-select class="w100" v-model="value" clearable default-first-option placeholder="合集">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"/>
              </el-select>
            </div>
            <div class="">
              <el-select class="w100" v-model="videoForm.compilationId" clearable placeholder="不选择合集">
                <el-option v-for="item in videoCompilationOption"
                           :key="item.compilationId"
                           :label="item.title"
                           :value="item.compilationId"/>
              </el-select>
            </div>
          </div>
        </div>
        <div class="mtb5">
          <h3>发布设置</h3>
          <el-divider/>
          <div class="mtb5">
            <h4>设置谁可以看</h4>
            <el-radio-group class="mtb5" v-model="whoCanWatchId" size="small">
              <el-radio-button :label="item.id" v-for="item in whoCanWatchList">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="mtb5">
            <h4>发布时间</h4>
            <el-radio-group class="mtb5" v-model="publishTimeType" size="small">
              <el-radio-button :label="item.id" v-for="item in publishTimeTypeOptions">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="mtb5" v-if="publishTimeType==='1'">
            <h4>选择发布时间</h4>
            <el-date-picker
                v-model="valueTime"
                class="mtb5"
                style="width: 100% !important;"
                type="datetime"
                placeholder="选择发布时间"
                :picker-options="pickerOptions"/>
          </div>
        </div>
        <div class="mtb5">
          <el-button class="w100" type="primary" @click="submitForm">发布</el-button>
        </div>
      </div>
      <!--    移动端回显-->
      <div class="w50 flex-center">
        <div class="flex-column" style="width: 80%">
          <div class="mobile-preview flex-center">
            <div class="phone-container oh flex-center">
              <div class="phone-screen">
                <div class="carousel-container">
                  <!--                  内容区域-->
                  <div class="carousel">
                    <video v-if="videoForm.videoUrl !== ''"
                           :src="videoForm.videoUrl"
                           autoplay
                           loop
                           class="video"/>
                  </div>
                </div>
                <img :src="user.avatar" class="avatar-class" alt=""/>
                <img src="//lf-cdn-tos.bytescm.com/obj/static/douyin-creator-content/micro/imgs/out.052ae810.png"
                     class="preview-card" alt=""/>
                <img class="preview-like" src="@/assets/images/preview-like.png" alt=""/>
                <div class="layer-top">
                  <div class="bottom-binder">
                    <div class="one-line fs7 fw500 flex-center">
                      <span class="">@{{ user.nickName }}</span>
                      <div class="flex-center">
                        <i class="iconfont icon-pics ml5" style="font-size: 0.8rem;"></i>
                        <span class="fs7 fw500">图文</span>
                      </div>
                    </div>
                    <div id="phoneText" class="input-text--1URCd"><span><span></span></span></div>
                    <div class="music-binder" style="display: flex;align-items: center">
                      <img class="mr5" style="width: 16px;height: 16px;display: inline-block"
                           src="@/assets/logo/logo-niuyin-new.png" alt="logo"/>
                      <marquee class="fs5" style="display: inline-block">roydon创作的原声</marquee>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5 class="mtb5">开启定位</h5>
            <el-switch
                v-model="videoForm.positionFlag"
                active-value="1"
                inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </div>
          <div v-if="videoForm.positionFlag==='1'">
            <h5 class="mtb5">选择定位</h5>
            <MapView ref="map" @updateLocation="selectAddressEmit"/>
            <p class="cg fs7 mtb5">提示：点击定位按钮进行定位，选择定位有助于同城推送</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken} from "@/utils/auth.js";
import {getVideoCategoryTree, publishVideo, saveVideoTag, videoCategory} from "@/api/video";
import {videoCompilationPage} from "@/api/creator";
import {userInfoX} from "@/store/userInfoX";
import MapView from "@/components/map/MapView.vue";

export default {
  name: "PublishVideo",
  components: {MapView},
  data() {
    return {
      user: userInfoX().userInfo,
      videoFlag: false,
      uploadVideoFlag: true, //是否可上传视频
      loading: false,
      videoUploadUrl: process.env.VUE_APP_DOMAIN_URL + "/creator/api/v1/upload-video",
      coverImageUploadUrl: process.env.VUE_APP_DOMAIN_URL + "/creator/api/v1/upload-video-image",
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      videoUploadPercent: undefined,
      videoForm: {
        publishType: '0',
        videoTitle: '',
        videoUrl: '',
        categoryId: undefined,
        coverImage: '',
        videoDesc: '',
        videoTags: [],
        positionFlag: '0',
        position: {},
        compilationId: null, //视频合集id
      },
      categoryList: [],//视频分类集合
      rules: {
        videoTitle: [
          {required: true, message: '请输入视频标题', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ]
      },
      // 视频标签对象
      videoTags: [],
      videoTagIds: [],
      videoTag: {
        tagId: null,
        tag: ''
      },
      tagInputVisible: false,
      tagInputValue: undefined,
      tagBtn: true,
      options: [
        {
          value: '1',
          label: '合集'
        }
      ],
      value: undefined,
      value2: undefined,
      whoCanWatchList: [
        {id: '0', name: "公开可见"},
        {id: '1', name: "仅好友可见"},
        {id: '2', name: "仅自己可见"},
      ],
      whoCanWatchId: '0',
      publishTimeTypeOptions: [
        {id: '0', name: "立即发布"},
        {id: '1', name: "定时发布"},
      ],
      publishTimeType: '0',
      valueTime: undefined,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - (24 * 3600 * 1000) || time.getTime() > Date.now() + (7 * 24 * 3600 * 1000)
        }
      },
      supportImageType: [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp',
      ],
      successExample: [
        {
          id: 1,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/img1.png~tplv-zomxhfrryo-0.png",
          title: "画质清晰，建议分辨率不低于720p"
        },
        {
          id: 2,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/img3.png~tplv-zomxhfrryo-0.png",
          title: "有信息量，封面能反映视频主题"
        },
        {
          id: 3,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/img5.png~tplv-zomxhfrryo-0.png",
          title: "构图合理，协调美观，色彩适宜"
        },
      ],
      failExample: [
        {
          id: 1,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/img13.png~tplv-zomxhfrryo-0.png",
          title: "画质模糊，内容难以辨认"
        },
        {
          id: 2,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/18.png~tplv-zomxhfrryo-0.png",
          title: "信息量小，封面与视频关联性不强"
        },
        {
          id: 3,
          cover: "https://p3-pc-douyin-creator.byteimg.com/tos-cn-i-zomxhfrryo/tinified/20.png~tplv-zomxhfrryo-0.png",
          title: "构图不当，展示不全，封面无美感"
        },
      ],
      videoCompilationPageDTO: {
        title: null,
        pageNum: 1,
        pageSize: 10
      },
      videoCompilationOption: [],
      videoCompilationTotal: null,
    }
  },
  created() {
    this.initVideoCategoryTree()
    this.getUserVideoCompilations()
  },
  methods: {
    // 初始化视频分类树
    initVideoCategoryTree() {
      getVideoCategoryTree().then(res => {
        if (res.code === 200) {
          this.categoryList = res.data
        }
      })
    },
    // 获取用户视频合集
    getUserVideoCompilations() {
      videoCompilationPage(this.videoCompilationPageDTO).then(res => {
        if (res.code === 200) {
          this.videoCompilationOption = res.rows
          this.videoCompilationTotal = res.total
        }
      })
    },
    // 确定发布视频
    submitForm() {
      this.videoForm.videoTags = this.videoTagIds
      if (this.videoForm.categoryId.length > 1) {
        this.videoForm.categoryId = this.videoForm.categoryId[this.videoForm.categoryId.length - 1]
      }
      console.log(this.videoForm)
      publishVideo(this.videoForm).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          // todo 发布成功显示弹窗提示是否跳转到作品管理页面
          this.$router.push('/content/post')
        }
      })
    },
    // 验证视频格式
    beforeUploadVideo(file) {
      if ([
        'video/mp4',
        'video/ogg',
        'video/flv',
        'video/avi',
        'video/wmv',
        'video/rmvb',
        'video/mkv'
      ].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
    },
    // 上传进度显示
    uploadVideoProcess(event, file, fileList) {
      console.log(event.percent, file, fileList)
      this.videoFlag = true
      this.loading = true
      this.videoUploadPercent = Math.floor(event.percent)
    },
    // 获取上传地址
    handleVideoSuccess(res, file) {
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.code === 200) {
        this.loading = false
        this.videoForm.videoUrl = res.data
        this.videoForm.coverImage = res.data + "?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0,m_fast,ar_auto"
        this.uploadVideoFlag = false
      } else {
        this.$message.error(res.msg)
      }
    },
    // 添加视频标签
    handleInputConfirm() {
      if (this.videoTags.length > 5) {
        this.tagInputVisible = false
        this.tagBtn = false
      } else {
        this.videoTag.tag = this.tagInputValue
        saveVideoTag(this.videoTag).then(res => {
          if (res.code === 200) {
            this.videoTag.tagId = res.data
            if (!this.videoTagIds.includes(res.data)) {
              this.videoTags.push(this.videoTag)
              this.videoTagIds.push(res.data)
              console.log(this.videoTagIds)
            }
            this.tagInputVisible = false
            this.tagInputValue = null
            this.videoTag = {}
            if (this.videoTagIds.length >= 5) {
              this.tagBtn = false
            }
          }
        })
      }
    },
    // 展示标签输入框
    showTagInput() {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.RefTagInput.focus()
      })
    },
    // 删除标签
    handleTagClose(item) {
      this.videoTagIds.splice(this.videoTagIds.indexOf(item.tagId), 1)
      this.videoTags.splice(this.videoTags.indexOf(item), 1)
    },
    // 上传封面
    beforeCoverImagerUpload(file) {
      if (this.supportImageType.indexOf(file.type) === -1) {
        this.$message.error('请上传正确的图片格式')
      }
    },
    // 封面上传成功
    handleCoverImageSuccess(res, file) {
      if (res.code === 200) {
        this.loading = false
        this.videoForm.coverImage = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    handleRemove(file) {
    },
    // 定位结果
    selectAddressEmit(address) {
      console.log(address)
      this.videoForm.videoForm = address
    },

  },
  destroyed() {
    this.videoForm = {}
  }

}
</script>

<style scoped>
.mobile-preview {
  height: 575px;
}

.phone-container {
  width: 270px;
  height: auto;
}

.phone-screen {
  position: absolute;
  width: 243px;
  height: 515px;
  top: 10px;
  z-index: 1;
  background-color: black;
  border-radius: 24px;
}

.avatar-class {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 235px;
  right: 9px;
  border-radius: 15px;
  border: 1px solid grey;
}

.preview-card {
  width: 243px;
  height: 515px;
  border-radius: 24px;
  position: absolute;
  top: 0;
  z-index: -1;
}

.preview-like {
  width: 243px;
  height: 224px;
  position: absolute;
  top: 232px;
  right: 5px;
}

.layer-top {
  position: absolute;
  bottom: 60px;
  left: 10px;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.preview-like {
  width: 234px;
  height: 224px;
  position: absolute;
  top: 238px;
  right: 5px;
}

.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .uploader-icon {
    font-size: 2rem;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 180px;
    text-align: center;
  }

  & img {
    width: 100px;
    height: 100px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed grey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

:deep(.el-upload) {
  height: 100%;
}

.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.carousel-container {
  position: absolute;
  width: 243px;
  height: 458px;
  padding: 0 5px;
  top: 0;
  z-index: -1;
  overflow: hidden;
  border-radius: 24px;

  .carousel {
    position: relative;
    height: 100%;

    .video {
      position: absolute;
      max-width: 100%;
      max-height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:deep(.el-carousel) {
      height: 100%;
    }

    &:deep(.el-carousel__container) {
      height: 100% !important;
    }

    .carousel-item {

    }
  }

}

</style>
