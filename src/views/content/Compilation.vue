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
    <!--    分页-->
    <el-pagination v-show="videoCompilationCount>0"
                   :total="videoCompilationCount"
                   background
                   layout="prev, pager, next, sizes"
                   :page-sizes="[10, 20]"
                   :current-page="videoCompilationPageDTO.pageNum"
                   :page-size="videoCompilationPageDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
  </div>
</template>

<!--
*@author roydon
*@date 2023/12/4 18:09
-->
<script>
import {videoCompilationPage} from "@/api/creator";

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

    },
    // 删除
    handleDelete(videoId) {

    },
    // 创建
    handleCreate() {

    },
  }
}
</script>

<style scoped>

</style>
