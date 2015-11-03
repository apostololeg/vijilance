var webpack = require('webpack');

module.exports = {
    context: __dirname + '/static',
    entry: './blocks/app/app.js',
    output: {
        path: './',
        filename: '_app.js'
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
        ]
    },
    plugins: [
        // remove duplicated plugins
        new webpack.optimize.DedupePlugin()
    ]
};
