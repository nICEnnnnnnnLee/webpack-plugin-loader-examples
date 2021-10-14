/*
  该插件是不合规范的，仅用作入门
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
        const { hooks, options } = compiler;
        const outputPath = options.output.path
        // 当全部完毕后执行
        hooks.done.tap(pluginName, () => {
            // 将LICENSE复制到目标文件夹
            if (fs.existsSync(this.licensePath)) {
                const output = resolve(outputPath, 'LICENSE.txt')
                console.log(outputPath);
                console.log(output);
                const data = fs.readFileSync(this.licensePath);
                fs.writeFileSync(output, data)
            } else {
                console.error(`${this.licensePath} is not exist!`)
            }
        });
    }
}


module.exports = CreateLicensePlugin;
