# 路径
找到react-script模块文件夹config下面  paths.js
node_modules\react-scripts\config\ paths.js

45行到 49行

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './'); // 配置文件跟路径'/'
  return ensureSlash(servedUrl, true);
}



# babel
加入 .babelrc ，内容 {} 就报错。

./src/index.js
Syntax error: D:/crg/github/react-simple-component/src/index.js: Unexpected token (8:16)

   6 | import registerServiceWorker from './registerServiceWorker';
   7 |
>  8 | ReactDOM.render(<Router />, document.getElementById('root'));
     |                 ^
   9 | registerServiceWorker();
  10 |

最终
    1、cnpm i --save babel-polyfill
    2、import "babel-polyfill" (最顶部)