


/**
 * @error Critical dependencies:require function is used in a way in which dependencies cannot be statically extracted
 * @desc 批量引入文件，节省代码  暂未成功，原因 webpack2一下不支持函数引入
 * @param _path <string> 要引入文件的相对路径，就像平常引入文件一样
 * @param _ext <string> 文件扩展名 不带点
 */
export function requireFile(_path, _ext) {
    // 自动引入./modules组件
    const path = require('path')
    const reg = new RegExp(`\.${_ext}$`)
    const files = require.context(_path, false, reg)
    const modules = {}
    files.keys().forEach(key=> {
        const name = path.basename(key, '.vue')
        console.log(key, name, files, 'key, name, files[key]')
        modules[name] = files(key).default || files(key)
    })
    return modules
}
// const path = require('path')
// const components = require.context('.', false, /\.vue$/)
// const changeModules = {}
// components.keys().forEach(key=> {
//     const name = path.basename(key, '.vue')
//     changeModules[name] = components(key).default || components(key)
// })
// module.exports = {
//     requireFile
// }
