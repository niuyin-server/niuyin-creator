<template>
  <!--  作品管理-->
  <div class="b-radius1">
    <!-- 搜索 -->
    <el-form :model="videoPageDTO" ref="queryForm" size="small" :inline="true">
      <el-form-item label="视频标题" prop="videoTitle">
        <el-input v-model="videoPageDTO.videoTitle" placeholder="请输入视频标题" clearable style="width: 200px"
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据 -->
    <el-table v-loading="loading" :data="videoPageList">
      <el-table-column label="视频封面" width="160" align="center">
        <template slot-scope="scope">
          <el-image style="height: 80px;border-radius: 8px;" lazy :src="scope.row.coverImage"
                    :fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="视频标题" prop="videoTitle" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="观看量" prop="viewNum" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="点赞数" prop="likeNum" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="收藏数" prop="favoritesNum" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="发布时间" prop="createTime" width="160" align="center"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" circle icon="el-icon-edit" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-popconfirm
              confirm-button-text='删除'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该作品吗？"
              @confirm="handleDelVideo(scope.row.videoId)">
            <el-button slot="reference" size="mini" type="text" icon="el-icon-delete"
                       @click="handleDelete(scope.row.videoId)">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination v-show="videoCount>0"
                   :total="videoCount"
                   background
                   layout="total, prev, pager, next, sizes"
                   :page-sizes="[10, 20, 50]"
                   :current-page="videoPageDTO.pageNum"
                   :page-size="videoPageDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
    <!-- 创建合集dialog -->
    <el-dialog :title="updateVideoDialogTitle" :visible.sync="updateVideoDialogVisible" width="50%">
      <div>
        <el-form ref="createVideoCompilationForm" :model="updateVideoDTO">
          <el-form-item>
            <div>视频封面</div>
            <el-upload
                class="cover-uploader wh100"
                :action="coverImageUploadUrl"
                :headers="headers"
                :show-file-list="false"
                :limit="1"
                :on-success="handleCoverImageSuccess"
                :before-upload="beforeCoverImagerUpload">
              <img v-if="updateVideoDTO.coverImage" :src="updateVideoDTO.coverImage"
                   class="avatar"
                   alt=""/>
              <i v-else class="uploader-icon el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <div>视频合集名称</div>
            <el-input v-model="updateVideoDTO.videoTitle"
                      placeholder="视频标题"
                      clearable
                      maxlength="100"
                      show-word-limit
                      type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <div>视频合集描述</div>
            <el-input v-model="updateVideoDTO.videoDesc"
                      placeholder="视频描述..."
                      clearable
                      maxlength="200"
                      show-word-limit
                      type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div class="tac mtb5">
          <el-button class="w100" type="primary" @click="confirmUpdateVideo">更新</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {videoPage} from "@/api/creator";
import {deleteVideo, updateVideo} from "@/api/video";
import {getToken} from "@/utils/auth";

export default {
  name: 'Post',
  components: {},
  data() {
    return {
      loading: true,
      videoPageDTO: {
        videoTitle: null,
        publishType: null,
        showType: null,
        positionFlag: null,
        auditsStatus: null,
        pageNum: 1,
        pageSize: 10
      },
      videoPageList: [],
      videoCount: 0,
      fit: 'contain',
      // 更新视频
      updateVideoDialogTitle: "更新视频",
      updateVideoDialogVisible: false,
      updateVideoDTO: {
        videoId: null,
        videoTitle: null,
        videoDesc: null,
        coverImage: null,
        showType: undefined,
        positionFlag: undefined,
      },
      coverImageUploadUrl: process.env.VUE_APP_DOMAIN_URL + "/creator/api/v1/upload-video-image",
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      supportImageType: [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp',
      ],
    }
  },
  created() {
    this.initVideoPageList()
  },
  methods: {
    initVideoPageList() {
      this.loading = true
      videoPage(this.videoPageDTO).then(res => {
        if (res.code === 200) {
          this.videoPageList = res.rows
          this.videoCount = res.total
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      })
    },
    handleQuery() {
      this.initVideoPageList()
    },
    resetQuery() {
      this.videoPageDTO = {
        videoTitle: null,
        publishType: null,
        showType: null,
        positionFlag: null,
        auditsStatus: null,
        pageNum: 1,
        pageSize: 10
      }
      this.initVideoPageList()
    },
    handleCurrentChange(v) {
      this.videoPageDTO.pageNum = v
      this.initVideoPageList()
    },
    handleSizeChange(v) {
      this.videoPageDTO.pageSize = v
      this.initVideoPageList()
    },
    handleUpdate(row) {
      this.updateVideoDialogVisible = true
      this.updateVideoDTO.videoId = row.videoId
      this.updateVideoDTO.videoTitle = row.videoTitle
      this.updateVideoDTO.videoDesc = row.videoDesc
      this.updateVideoDTO.coverImage = row.coverImage
      this.updateVideoDTO.showType = row.showType
      this.updateVideoDTO.positionFlag = row.positionFlag
      console.log(this.updateVideoDTO)
    },
    handleDelVideo(videoId) {
      console.log(videoId)
      deleteVideo(videoId).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.initVideoPageList()
        }
      })
    },
    handleDelete(videoId) {
      // console.log(videoId)
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
        this.updateVideoDTO.coverImage = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 更新视频
    confirmUpdateVideo() {
      console.log(this.updateVideoDTO)
      updateVideo(this.updateVideoDTO).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.updateVideoDialogVisible = false
          this.updateVideoDTO = {
            videoId: null,
            videoTitle: null,
            videoDesc: null,
            coverImage: null,
            showType: undefined,
            positionFlag: undefined,
          }
          this.initVideoPageList()
        }
      })
    },
  }
}
</script>

<style scoped>
.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  height: 300px;
  position: relative;
  overflow: hidden;

  &:deep(.el-upload) {
    height: 100%;
    border-radius: 6px;
  }

  .uploader-icon {
    font-size: 2rem;
    color: #8c939d;
    width: 300px;
    height: 300px;
    text-align: center;
  }

  & img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
}

</style>
