<template>
  <div class="publish-container">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane v-for="(tab) in publishTypeTab"
                     :label="tab.tabName"
                     :name="tab.tabVal"
                     :lazy="true"/>
        <!--      发布视频-->
        <div v-if="activeName==='0'">
          <PublishVideo/>
        </div>
        <!--      发布图文-->
        <div v-if="activeName==='1'">
          <PublishImage/>
        </div>
<!--        <div v-if="activeName==='2'">-->
<!--          <PublishQuanjing/>-->
<!--        </div>-->
      </el-tabs>
  </div>
</template>

<script>
import PublishVideo from "@/components/publish/PublishVideo.vue";
import PublishImage from "@/components/publish/PublishImage.vue";
import PublishQuanjing from "@/components/publish/PublishQuanjing.vue";

export default {
  name: "Publish",
  components: {PublishVideo, PublishImage, PublishQuanjing},
  data() {
    return {
      publishTypeTab: [
        {id: 1, tabName: "发布视频", tabVal: '0'},
        {id: 2, tabName: "发布图文", tabVal: '1'},
        // {id: 3, tabName: "发布全景视频", tabVal: '2'},
      ],
      activeName: '0',
    };
  },
  created() {

  },
  methods: {}
};
</script>

<style scoped>
.publish-container {
  border-radius: 1rem;
  height: 100%;
}
</style>

