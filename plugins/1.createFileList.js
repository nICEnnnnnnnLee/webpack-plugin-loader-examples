/*
    https://webpack.js.org/contribute/writing-a-plugin/#example
    这是一个官方的例子，将所有输出的文件汇总到一个文件中, 用法如下：
    plugins: [
        ...,
        new FileListPlugin({
            outputFile: 'assets.md'
        }),
        ...
    ],  

    输出的文件内容大致如下：

    # In this build:

    - bundle.js
    - index.html
*/
class FileListPlugin {
    // 设置默认配置
    static defaultOptions = {
        outputFile: 'assets.md',
    };
    constructor(options = {}) {
        // 接收参数生成配置
        this.options = { ...FileListPlugin.defaultOptions, ...options };
    }
    apply(compiler) {
        const pluginName = FileListPlugin.name;
        // 从compiler里取出后面要用的东西
        const { hooks, webpack } = compiler;
        const { Compilation } = webpack;
        const { RawSource } = webpack.sources;
        // 为了获得传入的compilation这个关键对象, 我们必须进行一次hook
        // 我们应当尽早hook，于是选择了 hooks.thisCompilation
        hooks.thisCompilation.tap(pluginName, (compilation) => {
            // 我们在assets都已经差不多处理好的阶段(Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE)
            //   遍历assets，将它们的名称会在一起形成一个文件
            //   将新文件提交给webpack
            compilation.hooks.processAssets.tap({
                name: pluginName,
                stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            }, (assets) => {
                const content =
                    '# In this build:\n\n' +
                    Object.keys(assets)
                        .map((filename) => `- ${filename}`)
                        .join('\n');
                compilation.emitAsset(
                    this.options.outputFile,
                    new RawSource(content)
                );
            }
            );
        });
    }
}
module.exports = FileListPlugin;

