let
    ExtractTextPlugin = require('extract-text-webpack-plugin');
// {
//     // Exclude `js` files to keep "css" loader working as it injects
//     // it's runtime that would otherwise processed through "file" loader.
//     // Also exclude `html` and `json` extensions so they get processed
//     // by webpacks internal loaders.
//     exclude: [/\.js$/, /\.html$/, /\.json$/,/\.scss$/],   // 这里添加  ,/\.scss$/
//         loader: require.resolve('file-loader'),
//     options: {
//     name: 'static/media/[name].[hash:8].[ext]',
// },
// },
module.exports = (type) => {
    let
        isDevelopment = type === 'development',
        loaders = ['style-loader', 'css-loader', 'sass-loader'],
        loadersUse = isDevelopment ? loaders.map(item => {
            return {loader: item}
        }) : ExtractTextPlugin.extract({
            use: loaders.slice(1).map(item => {
                return {loader: item}
            }),
            fallback: loaders[0]
        });
    return {

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: loadersUse
                }
            ]
        },
    };
}