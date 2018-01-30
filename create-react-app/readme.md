
找到react-script模块文件夹config下面  paths.js
node_modules\react-scripts\config\ paths.js

45行到 49行

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './'); // 配置文件跟路径'/'
  return ensureSlash(servedUrl, true);
}