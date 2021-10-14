
// 如果需要面对多个订阅者，建议使用SyncWaterfallHook
// 此处如有多个订阅者, 会覆盖前面的设置
const SyncHook = require('tapable').SyncHook;

const pluginHooksMap = new WeakMap();

function getHooks(compilation) {
    let hooks = pluginHooksMap.get(compilation);
    if (hooks === undefined) {
        hooks = createHooks();
        pluginHooksMap.set(compilation, hooks);
    }
    return hooks;
}

function createHooks() {
    return {
        beforeCompilation: new SyncHook(['pluginObj']),
    };
}

module.exports = getHooks;