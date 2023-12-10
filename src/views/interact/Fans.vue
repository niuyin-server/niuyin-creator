<template>
  <div class="b-radius1">
    <h1 class="ml2rem">粉丝列表</h1>
    <!-- 数据 -->
    <el-table v-loading="loading" :data="fansList">
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image style="height: 64px;border-radius: 32px;"
                    lazy :fit="fit"
                    :src="scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="nickName" width="200" :show-overflow-tooltip="true" align="center"/>
      <el-table-column label="签名" prop="description" :show-overflow-tooltip="true" align="center"/>
    </el-table>
    <!--    分页-->
    <el-pagination v-show="fansTotal>0"
                   :total="fansTotal"
                   background
                   layout="total, prev, pager, next, sizes"
                   :page-sizes="[10, 20, 50]"
                   :current-page="fansQueryDTO.pageNum"
                   :page-size="fansQueryDTO.pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
  </div>
</template>

<!--
*@author roydon
*@date 2023/12/4 19:16
-->
<script>
import {userFansPage} from "@/api/social";

export default {
  name: 'Fans',
  props: {},
  components: {},
  data() {
    return {
      loading: true,
      fansList: [],
      fansTotal: 0,
      fansQueryDTO: {
        pageNum: 1,
        pageSize: 10
      },
      fit: 'contain',
    }
  },
  created() {
    this.initUserFansPage()
  },
  methods: {
    initUserFansPage() {
      this.loading = true
      userFansPage(this.fansQueryDTO).then(res => {
        if (res.code === 200) {
          this.fansList = res.rows
          this.fansTotal = res.total
          this.loading = false
        }
      })
    },
    handleCurrentChange(v) {
      this.fansQueryDTO.pageNum = v
      this.initUserFollowPage()
    },
    handleSizeChange(v) {
      this.fansQueryDTO.pageSize = v
      this.initUserFollowPage()
    },
  }
}
</script>

<style scoped>

</style>
