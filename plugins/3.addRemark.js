/*
  该插件用于在输出的index.html文件里面的<head>标签下插入备注, 用法如下：
    plugins: [
        ...,
        new AddRemarksPlugin({
            remarks: ''
        }),
    ],  
 */
const pluginName = 'AddRemarksPlugin';

class AddRemarksPlugin {
    //在构造函数里面接收配置参数
    constructor(options = {}) {
        this.remarks = options.remarks || '<!-- 这是一条由AddRemarksPlugin生成的默认备注 -->'
    }

    apply(compiler) {
        const { hooks, options, webpack } = compiler;
        const outputPath = options.output.path

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.afterOptimizeAssets.tap(pluginName, (assets) => {
                const htmlObj = assets['index.html']
                if(htmlObj){
                    const raw = htmlObj._valueAsString
                    const start = raw.indexOf('<head>') + 6
                    const left = raw.substring(0, start)
                    const right = raw.substring(start)
                    const content = `${left}\n${this.remarks}\n${right}`
                    compilation.updateAsset(
                        'index.html',
                        new webpack.sources.RawSource(content)
                    );
                }else{
                    console.error('不存在index.html!!!');
                }
            })
            // compilation.hooks.processAssets.tap({
            //     name: pluginName,
            //     stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            // }, (assets) => {
            //     const htmlObj = assets['index.html']
            //     if(htmlObj){
            //         const raw = htmlObj._valueAsString
            //         const start = raw.indexOf('<head>') + 6
            //         const left = raw.substring(0, start)
            //         const right = raw.substring(start)
            //         const content = `${left}\n${this.remarks}\n${right}`
            //         compilation.updateAsset(
            //             'index.html',
            //             new webpack.sources.RawSource(content)
            //         );
            //     }else{
            //         console.error('不存在index.html!!!');
            //     }
            // });
        });
    }
}


module.exports = AddRemarksPlugin;
