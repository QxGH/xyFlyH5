#!/usr/bin/env node

/**
 * 参数
 */
const args = require('minimist')(process.argv.splice(2))

/**
 * 运行模式
 * @type {*|string}
 */
const env = args.env || '';

/**
 * 平台
 * @type {*|string}
 */
const platform = args.platform || '';

if (!env || !platform) return;

const fs = require('fs')
const path = require('path')

/**
 * 完整的编译输出路径
 * @type {string}
 */
const buildPath = path.join(__dirname, '../../', 'dist/' + ('production' === env ? 'build' : 'dev') + '/' + platform.toLowerCase());

/**
 * 需移除文件列表
 * @type {string[]}
 */
const removeFileItems = [
    'ext.json'
];

/**
 * 遍历需移除文件列表，单个执行删除
 */
removeFileItems.forEach((item, index, removeFileItems) => {
    try {
        /**
         * 判断文件是否存在，如存在则删除
         */
        let delPath = '';
        if (fs.existsSync(delPath = path.join(buildPath, item))) fs.unlinkSync(delPath);
    } catch (e) {
    }
});
