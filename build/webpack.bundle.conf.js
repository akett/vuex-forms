const path                     = require('path')
const webpack                  = require('webpack')
const CopyWebpackPlugin        = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const base                     = require('./webpack.base.conf')
const config                   = require('../config')
const vueLoaderConfig          = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// this is used only for umd browser bundle,
// refer to .babelrc for lib configuration

base.entry = {
    'VuexForms': './lib/index.js',
    'validators': './lib/validators/index.js'
}

base.output = {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: '[name]'
}

base.resolve.alias = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src')
}

base.module = {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        },
        {
            test: /\.es6$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
    ]
}

var webpackConfig = Object.assign({}, base)

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js)$'),
        threshold: 10240,
        minRatio: 0.8
    })
])

module.exports = webpackConfig