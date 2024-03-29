import request from '@/utils/request'

// 视频流-feed
export async function videoFeed(createTime) {
    const data = {
        createTime
    }
    return await request({
        url: '/video/api/v1/feed',
        method: 'post',
        data: data
    })
}

// 分页查询我的视频
export function videoMypage(data) {
    return request({
        url: '/video/api/v1/mypage',
        method: 'post',
        data: data
    })
}

// 分页查询用户视频
export function videoUserpage(data) {
    return request({
        url: '/video/api/v1/userpage',
        method: 'post',
        data: data
    })
}

// 发布视频
export function publishVideo(data) {
    return request({
        url: '/video/api/v1/publish',
        method: 'post',
        data: data
    })
}

// 视频分类列表
export async function videoCategory() {
    return await request({
        url: '/video/api/v1/category',
        method: 'get'
    })
}

// 视频分类分页video
export function videoCategoryPage(data) {
    return request({
        url: '/video/api/v1/category/page',
        method: 'post',
        data: data
    })
}

// 热门视频
export function hotVideoPage(data) {
    return request({
        url: '/video/api/v1/hot',
        method: 'post',
        data: data
    })
}

// 用户视频点赞总数
export async function userLikeNums(userId) {
    return await request({
        url: '/video/api/v1/likeNums/' + userId,
        method: 'get',
    })
}

// 保存标签
export function saveVideoTag(data) {
    return request({
        url: '/video/api/v1/tag/save',
        method: 'post',
        data: data
    })
}

// 我的作品数量
export async function myVideoCount() {
    return await request({
        url: '/video/api/v1/videoCount',
        method: 'get'
    })
}

// 查询用户作品
export function memberInfoPage(data) {
    return request({
        url: '/video/api/v1/personVideoPage',
        method: 'post',
        data: data
    })
}

// 创建视频合集
export function createVideoCompilation(data) {
    return request({
        url: '/video/api/v1/userVideoCompilation',
        method: 'post',
        data: data
    })
}

// 更新视频
export function updateVideo(data) {
    return request({
        url: '/video/api/v1/update',
        method: 'put',
        data: data
    })
}

// 删除视频
export function deleteVideo(videoId) {
    return request({
        url: '/video/api/v1/' + videoId,
        method: 'DELETE'
    })
}

// 更新视频合集
export function updateVideoCompilation(data) {
    return request({
        url: '/video/api/v1/userVideoCompilation/update',
        method: 'put',
        data: data
    })
}

// 视频分类树
export function getVideoCategoryTree() {
    return request({
        url: '/video/api/v1/category/tree',
        method: 'get'
    })
}

