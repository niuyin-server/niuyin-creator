<template>
  <!--  作品管理-->
  <div class="b-radius1">
    <!-- 搜索 -->
    <el-form :model="videoPageDTO" ref="queryForm" size="small" :inline="true">
      <el-form-item label="视频标题" prop="videoTitle">
        <el-input v-model="videoPageDTO.videoTitle" placeholder="请输入视频标题" clearable style="width: 200px" clean
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据 -->
    <el-table v-loading="loading" :data="videoPageList">
      <el-table-column label="视频封面" width="150" align="center">
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
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" circle icon="el-icon-edit" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row.videoId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination v-show="videoCount>0"
                   :total="videoCount"
                   background
                   layout="prev, pager, next, sizes"
                   :page-sizes="[10, 20, 50]"
                   :current-page="videoPageDTO.pageNum"
                   :page-size="videoPageDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import {videoPage} from "@/api/creator";

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

    },
    handleDelete(videoId) {

    },
  }
}
</script>

<style scoped>

</style>
