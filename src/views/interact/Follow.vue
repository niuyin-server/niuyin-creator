<template>
  <div class="b-radius1">
    <h1 class="ml2rem">关注列表</h1>
    <!-- 数据 -->
    <el-table v-loading="loading" :data="followList">
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image style="height: 64px;border-radius: 32px;"
                    lazy :fit="fit"
                    :src="scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="nickName" width="200" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="签名" prop="description" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row.userId)">取消关注
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination v-show="followTotal>0"
                   :total="followTotal"
                   background
                   layout="total, prev, pager, next, sizes"
                   :page-sizes="[10, 20, 50]"
                   :current-page="followQueryDTO.pageNum"
                   :page-size="followQueryDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
  </div>
</template>

<!--
*@author roydon
*@date 2023/12/4 19:15
-->
<script>
import {userFollowPage} from "@/api/social";

export default {
  name: 'Follow',
  props: {},
  components: {},
  data() {
    return {
      loading: true,
      followList: [],
      followTotal: 0,
      followQueryDTO: {
        pageNum: 1,
        pageSize: 10
      },
      fit: 'contain',
    }
  },
  created() {
    this.initUserFollowPage()
  },
  methods: {
    initUserFollowPage() {
      this.loading = true
      userFollowPage(this.followQueryDTO).then(res => {
        if (res.code === 200) {
          this.followList = res.rows
          this.followTotal = res.total
          this.loading = false
        }
      })
    },
    handleCurrentChange(v) {
      this.followQueryDTO.pageNum = v
      this.initUserFollowPage()
    },
    handleSizeChange(v) {
      this.followQueryDTO.pageSize = v
      this.initUserFollowPage()
    },
    // 取消关注
    handleDelete(userId) {
      console.log(userId)
    }
  }
}
</script>

<style scoped>

</style>
