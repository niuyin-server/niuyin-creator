import request from '@/utils/request'

// 我的关注
export function followPageList(data) {
    return request({
        url: '/social/api/v1/follow/page',
        method: 'post',
        data: data
    })
}

// 关注用户
export function followUser(userId) {
    return request({
        url: '/social/api/v1/follow/' + userId,
        method: 'get'
    })
}

// 关注数、粉丝数
export function followAndFans(userId) {
    return request({
        url: '/social/api/v1/follow/followFans/' + userId,
        method: 'get'
    })
}

// 分页查询我的关注
export function userFollowPage(data) {
    return request({
        url: '/social/api/v1/follow/page',
        method: 'post',
        data: data
    })
}

// 分页查询我的粉丝
export function userFansPage(data) {
    return request({
        url: '/social/api/v1/follow/fans-page',
        method: 'post',
        data: data
    })
}
