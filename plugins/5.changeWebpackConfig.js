/*
  该插件用于修改webpack其它插件(此处专指AddRemarksPlugin)的设置, 用法如下：
    plugins: [
        ...,
        new WebpackConfigResetPlugin({
            remarks: ''
        }),
    ],
   该插件向外暴露一个hook方法
   const WebpackConfigResetPlugin = require('...')

   WebpackConfigResetPlugin.getHooks(compilation).tap('xxx plugin', (plugin){
        plugin.remarks = 'xxx'
   });
 */
const pluginName = 'WebpackConfigResetPlugin';
const getHooks = require('./hooks')
class WebpackConfigResetPlugin {
    constructor(options = {}) {
        this.remarks = options.remarks || '<!-- 这是一条由WebpackConfigResetPlugin生成的默认备注  -->'
    }
    apply(compiler) {
        const { hooks, options, webpack } = compiler;
        const outputPath = options.output.path
        // options.plugins.forEach(plugin => {
        //     if('AddRemarksPlugin' === plugin.constructor.name){
        //         plugin.remarks = this.remarks
        //     }
        // });
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            getHooks(compilation).beforeCompilation.call(this)
        });
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            options.plugins.forEach(plugin => {
                if ('AddRemarksPlugin' === plugin.constructor.name) {
                    plugin.remarks = this.remarks
                }
            });
        });
    }
}
WebpackConfigResetPlugin.getHooks = getHooks;
module.exports = WebpackConfigResetPlugin;
