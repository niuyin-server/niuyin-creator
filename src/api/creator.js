import request from '@/utils/request'

// 视频分页
export function videoPage(data) {
    return request({
        url: '/creator/api/v1/videoPage',
        method: 'post',
        data: data
    })
}

// 合集分页
export function videoCompilationPage(data) {
    return request({
        url: '/creator/api/v1/videoCompilationPage',
        method: 'post',
        data: data
    })
}
