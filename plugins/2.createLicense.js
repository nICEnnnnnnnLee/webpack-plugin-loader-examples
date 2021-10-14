/*
  该插件用于将licensePath的文件输出到输出目录下License.txt, 用法如下：
    plugins: [
        ...,
        new CreateLicensePlugin({
            licensePath: './LICENSE'
        }),
    ],  
 */
const pluginName = 'CreateLicensePlugin';
const fs = require("fs");
const { resolve } = require("path");

class CreateLicensePlugin {
    //在构造函数里面接收配置参数
    constructor(options = {}) {
        this.licensePath = options.licensePath || './LICENSE'
    }

    apply(compiler) {
        const { hooks, options, webpack } = compiler;
        const outputPath = options.output.path

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap({
                name: pluginName,
                // https://github.com/webpack/webpack/blob/main/lib/Compilation.js#L5062
                // 在最初阶段添加LICENSE
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            }, (assets) => {
                // 将LICENSE读取并添加到assets
                if (fs.existsSync(this.licensePath)) {
                    const data = fs.readFileSync(this.licensePath);
                    compilation.emitAsset(
                        'LICENSE.txt',
                        new webpack.sources.RawSource(data)
                    );
                } else {
                    console.error(`${this.licensePath} is not exist!`)
                }

            });
        });
    }
}


module.exports = CreateLicensePlugin;
