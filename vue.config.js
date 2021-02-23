const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    RUNNING_MODE: JSON.stringify(process.env.RUNNING_MODE || '')
                }
            })
        ]
    },
    chainWebpack: (config) => {
        // 正式环境发布时屏蔽console 代码(包含所有 console 方法，如 log,debug,info...)
        config.optimization.minimizer('terser').tap((args) => {
            if (process.env.NODE_ENV === 'production') {
                const compress = args[0].terserOptions.compress
                // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
                compress.drop_console = true
                compress.pure_funcs = [
                    '__f__', // App 平台 vue 移除日志代码
                    // 'console.debug' // 可移除指定的 console 方法
                ]
            }
            return args
        })
    }
}
