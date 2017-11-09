function MyPlugin(options) {
  this.time = new Date().getTime();
}


MyPlugin.prototype.apply = function (compiler) {

  compiler.plugin('compilation', (compilation) =>{

    compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) =>{
      htmlPluginData.html = htmlPluginData.html.replace(/\/?(static\/\S+\.(?:css|js))/g, `$1?v=${this.time}`);
      callback(null, htmlPluginData);
    });
  });

  compiler.plugin("emit",  (compilation, callback) =>{


    let ret = compilation.chunks.reduce((prev, cur) => {
      let
        css = prev.css || [];


      cur.files.forEach((item) => {
        if (/.css($|\?)/.test(item)) {
          css.push(item);
        }
      });

      return {
        css
      }
    }, {});



    ret.css.forEach( (filename) =>{
      // source()可以得到每个文件的源码
      let source = compilation.assets[filename].source(),
        css = source.replace(/\/?static(\/\S+)\)/g, `..$1?v=${this.time})`);

      compilation.assets[filename] = {
        source: function () {
          return css;
        },
        size: function () {
          return css.length;
        }
      }
    });

    callback();
  });
};

// 以上compiler和compilation的事件监听只是一小部分，详细API可见该链接http://www.css88.com/doc/webpack2/api/plugins/

module.exports = MyPlugin;
