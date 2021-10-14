/*
  该插件用于修改WebpackConfigResetPlugin的配置, 用法如下：
    plugins: [
        ...,
        new HookPlugin({
            remarks: ''
        }),
        ...
        new WebpackConfigResetPlugin(),
    ],

 */
const pluginName = 'HookPlugin';
const WebpackConfigResetPlugin = require('./5.changeWebpackConfig')

class HookPlugin {
    //在构造函数里面接收配置参数
    constructor(options = {}) {
        this.remarks = options.remarks || '<!-- 这是一条由HookPlugin hook WebpackConfigResetPlugin 生成的默认备注  -->'
    }

    apply(compiler) {
        const { hooks, options, webpack } = compiler;
        const outputPath = options.output.path

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            WebpackConfigResetPlugin.getHooks(compilation)
                .beforeCompilation.tap(
                    pluginName,
                    (plugin) => plugin.remarks = this.remarks
                )
        })
    }

}

module.exports = HookPlugin;
