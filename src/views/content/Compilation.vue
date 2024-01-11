<template>
  <!--  合集管理-->
  <div class="b-radius1">
    <!-- 搜索 -->
    <el-form :model="videoCompilationPageDTO" ref="queryForm" size="small" :inline="true">
      <el-form-item label="合集标题" prop="title">
        <el-input v-model="videoCompilationPageDTO.title" placeholder="请输入合集标题" clearable style="width: 200px"
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate"
        >创建合集
        </el-button>
      </el-col>
    </el-row>
    <!-- 数据 -->
    <el-table v-loading="loading" :data="videoCompilationPageList">
      <el-table-column label="合集封面" width="160" align="center">
        <template slot-scope="scope">
          <el-image style="height: 80px;border-radius: 8px;" lazy :src="scope.row.coverImage"
                    :fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="合集标题" prop="title" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="合集描述" prop="description" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="发布时间" prop="createTime" width="160" align="center"/>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" circle icon="el-icon-edit" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row.compilationId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-show="videoCompilationCount>0"
                   :total="videoCompilationCount"
                   background
                   layout="total, prev, pager, next, sizes"
                   :page-sizes="[10, 20]"
                   :current-page="videoCompilationPageDTO.pageNum"
                   :page-size="videoCompilationPageDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
    <!-- 创建合集dialog -->
    <el-dialog :title="createVideoCompilationDialogTitle" :visible.sync="createVideoCompilationDialogVisible"
               width="50%">
      <div>
        <el-form ref="createVideoCompilationForm" :model="createVideoCompilationDTO">
          <el-form-item>
            <h4>视频合集封面</h4>
            <el-upload
                class="cover-uploader wh100"
                :action="coverImageUploadUrl"
                :headers="headers"
                :show-file-list="false"
                :limit="1"
                :on-success="handleCoverImageSuccess"
                :before-upload="beforeCoverImagerUpload">
              <img v-if="createVideoCompilationDTO.coverImage" :src="createVideoCompilationDTO.coverImage"
                   class="avatar"
                   alt=""/>
              <i v-else class="uploader-icon el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <h4>视频合集名称</h4>
            <el-input v-model="createVideoCompilationDTO.title"
                      placeholder="收藏夹的名称"
                      clearable
                      maxlength="20"
                      show-word-limit
                      type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <h4>视频合集描述</h4>
            <el-input v-model="createVideoCompilationDTO.description"
                      placeholder="收藏夹的描述..."
                      clearable
                      maxlength="200"
                      show-word-limit
                      type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div class="tac mtb5">
          <el-button class="w100" type="primary" @click="confirmCreateCompilation">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<!--
*@author roydon
*@date 2023/12/4 18:09
-->
<script>
import {videoCompilationPage} from "@/api/creator";
import {createVideoCompilation, updateVideoCompilation} from "@/api/video";
import {getToken} from "@/utils/auth";

export default {
  name: 'Compilation',
  props: {},
  components: {},
  data() {
    return {
      loading: true,
      videoCompilationPageDTO: {
        title: null,
        pageNum: 1,
        pageSize: 10
      },
      videoCompilationPageList: [],
      videoCompilationCount: 0,
      fit: 'contain',
      createVideoCompilationDialogVisible: false,
      createVideoCompilationDialogTitle: "创建视频合集",
      createVideoCompilationDTO: {
        title: null,
        description: null,
        coverImage: null,
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
    this.initVideoCompilationPageList()
  },
  methods: {
    initVideoCompilationPageList() {
      this.loading = true
      videoCompilationPage(this.videoCompilationPageDTO).then(res => {
        if (res.code === 200) {
          this.videoCompilationPageList = res.rows
          this.videoCompilationCount = res.total
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      })
    },
    handleQuery() {
      this.initVideoCompilationPageList()
    },
    resetQuery() {
      this.videoCompilationPageDTO = {
        title: null,
        pageNum: 1,
        pageSize: 10
      }
      this.initVideoCompilationPageList()
    },
    handleCurrentChange(v) {
      this.videoCompilationPageDTO.pageNum = v
      this.initVideoCompilationPageList()
    },
    handleSizeChange(v) {
      this.videoCompilationPageDTO.pageSize = v
      this.initVideoCompilationPageList()
    },
    // 修改
    handleUpdate(row) {
      this.createVideoCompilationDialogTitle = "更新视频合集"
      this.createVideoCompilationDialogVisible = true
      this.createVideoCompilationDTO.compilationId = row.compilationId
      this.createVideoCompilationDTO.title = row.title
      this.createVideoCompilationDTO.description = row.description
      this.createVideoCompilationDTO.coverImage = row.coverImage
    },
    // 删除
    handleDelete(videoId) {

    },
    // 创建
    handleCreate() {
      this.createVideoCompilationDialogTitle = "创建视频合集"
      this.createVideoCompilationDialogVisible = true
      this.resetCreateVideoCompilationDTO()
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
        this.createVideoCompilationDTO.coverImage = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 创建视频合集
    confirmCreateCompilation() {
      if (this.createVideoCompilationDTO.compilationId == null) {
        createVideoCompilation(this.createVideoCompilationDTO).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.createVideoCompilationDialogVisible = false
            this.initVideoCompilationPageList()
            this.resetCreateVideoCompilationDTO()
          }
        })
      } else {
        updateVideoCompilation(this.createVideoCompilationDTO).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.createVideoCompilationDialogVisible = false
            this.initVideoCompilationPageList()
            this.resetCreateVideoCompilationDTO()
          }
        })
      }

    },
    resetCreateVideoCompilationDTO() {
      this.createVideoCompilationDTO = {
        title: null,
        description: null,
        coverImage: null,
      }
    },
  }
}
</script>

<style scoped>
.cover-uploader {
  border: 2px dashed #b5b5b5;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  max-height: 300px;

  .uploader-icon {
    font-size: 3rem;
    color: #8c939d;
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }

  & img {
    max-height: 300px;
    border-radius: .5rem;
  }
}

</style>
