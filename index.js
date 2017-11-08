function MyPlugin(options) {
}


MyPlugin.prototype.apply = function (compiler) {


  compiler.plugin("emit", function (compilation, callback) {


    let ret = compilation.chunks.reduce((prev, cur) => {
      let html = prev.html || [],
        css = prev.css || [];


      cur.files.forEach((item) => {
        if (/.css($|\?)/.test(item)) {
          css.push(item);
        } else if (/.html($|\?)/.test(item)) {
          html.push(item);
        }
      });

      return {
        html,
        css
      }
    }, {});

  // html 没法获取到,只能使用在config中配置publicPath 为 "./"
    ret.html.forEach(function (filename) {
      // source()可以得到每个文件的源码
      let source = compilation.assets[filename].source(),
        html = source.replace(/\/static\//g, "static/");

      compilation.assets[filename] = {
        source: function () {
          return html;
        },
        size: function () {
          return html.length;
        }
      }
    });


    ret.css.forEach(function (filename) {
      // source()可以得到每个文件的源码
      let source = compilation.assets[filename].source(),
        css = source.replace(/\/static/g, "..");

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
