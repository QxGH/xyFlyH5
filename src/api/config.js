export const baseURL = 'development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE ? {
    api: 'https://api.services.xingchen.cn/',
    kernel: 'https://kernel.services.xingchen.cn/',
} : {
    api: 'https://api.services.xingchen.cn/',
    kernel: 'https://kernel.services.xingchen.cn/',
}