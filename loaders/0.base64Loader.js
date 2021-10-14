// const loaderUtils = require('loader-utils')
// loader-utils处理this.query非常方便，如有需要可以自行安装依赖

const base64Loader = function (source) {
    // let options = loaderUtils.getOptions(this)    //获取配置传递过来的参数
    console.log(this.query);
    const jsData = Buffer.from(source,'base64').toString();
    return jsData
}
module.exports = base64Loader