import decrypt from './index.b64'
/*
index.b64 为以下内容的base64编码：
    const decrypt = (data) => {
        return 'decrypt secret: ' + data;
    }
    export default decrypt;
*/
function add(a, b) {
    return a + b
}

console.log(decrypt('hh data'));
