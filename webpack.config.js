var webpack = require('webpack');

module.exports = {
    context: __dirname + '/public',
    entry: {
        view: './blocks/view/view.js',
        panel: './blocks/panel/panel.js'
    },
    output: {
        path: './public/bundles',
        filename: '_[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(styl|css)$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ],
        resolve: {
            extensions: [',', '.js', '.css', '.styl']
        },
    },
    plugins: [
        // remove duplicated plugins
        new webpack.optimize.DedupePlugin()
    ]
};
