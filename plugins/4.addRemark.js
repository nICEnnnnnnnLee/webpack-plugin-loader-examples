/*
  该插件基于html-webpack-plugin, 通过html-webpack-plugin暴露的接口进行操作
    详情请看样例：  https://github.com/jantimon/html-webpack-plugin
  该插件用于在HtmlWebpackPlugin生成的index.html文件里面的<head>标签下插入备注, 用法如下：
    plugins: [
        ...,
        new AddRemarksPlugin({
            remarks: ''
        }),
    ],  
 */
const pluginName = 'AddRemarksPlugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');

class AddRemarksPlugin {
    //在构造函数里面接收配置参数
    constructor(options = {}) {
        this.remarks = options.remarks || '<!-- 这是一条由AddRemarksPlugin生成的默认备注 -->'
    }

    apply(compiler) {
        const { hooks, options, webpack } = compiler;
        const outputPath = options.output.path

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                pluginName,
                (data, cb) => {
                    const raw = data.html
                    const start = raw.indexOf('<head>') + 6
                    const left = raw.substring(0, start)
                    const right = raw.substring(start)
                    data.html = `${left}\n${this.remarks}\n${right}`
                    cb(null, data)
                }
            )
        });
    }
}


module.exports = AddRemarksPlugin;
