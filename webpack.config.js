const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CreateLicensePlugin = require('./plugins/0.createLicense')
const FileListPlugin = require('./plugins/1.createFileList')
const CreateLicensePlugin = require('./plugins/2.createLicense')
// const AddRemarksPlugin = require('./plugins/3.addRemark')
const AddRemarksPlugin = require('./plugins/4.addRemark')
const WebpackConfigResetPlugin = require('./plugins/5.changeWebpackConfig')
const HookPlugin = require('./plugins/5.hookPlugin')

module.exports = {
    entry: resolve(__dirname, "./src/index.js"),
    output: {
        path: resolve(__dirname, "./build"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./src/index.html')
        }),
        new CreateLicensePlugin(),
        new FileListPlugin(),
        new AddRemarksPlugin(),
        new HookPlugin(),
        new WebpackConfigResetPlugin(),
    ],
    module: {
        rules: [{
            test: /\.b64$/,
            use: [{
                loader: resolve('./loaders/0.base64Loader.js'),
                // loader: 'base64-loader',
                options: {
                    param: '传递一个参数'
                }
            }],
        }]
    },
    // resolveLoader: {
    //     modules: ['node_modules', './loaders'],
    //     alias: {
    //          "base64-loader": '0.base64Loader.js',
    //     }
    // },
    mode: 'development'
}
