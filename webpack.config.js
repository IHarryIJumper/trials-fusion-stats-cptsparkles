var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var getPlugins = function () {
    var plugins = [];
    // var hotReload = new webpack.HotModuleReplacementPlugin()
    var noErrorsPlugin = new webpack.NoErrorsPlugin();
    var clearDist = new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true, 
      dry: false
    });

    plugins.push(clearDist);
    plugins.push(noErrorsPlugin);
    // plugins.push(hotReload);

    var node_env = new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    });
    

    plugins.push(node_env);

    return plugins;
};

var webpackConfig = {
    entry: {
        main: [
            __dirname + '/client/scripts/main.js'
        ],
        season1: [
            __dirname + '/client/scripts/season1.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        sourceMapFilename: "debugging/[file].map",
        filename: '[name].js'
    },
    plugins: getPlugins(),
    externals: [],
    // devtool: 'eval',
    // devtool: 'cheap-inline-module-source-map',
    devtool: 'cheap-eval-source-map',
    module: {
        loaders: [{
                test: /.jsx?$/,
                include: [/client/],
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: ['es2015', 'react'],
                    compact: false
                }
            },
            {
                test: /\.js$/,
                include: [/client/],
                exclude: [/node_modules/],
                loader: 'babel-loader',
                query: {
                    compact: false
                }
            }, {
                test: /\.rt/,
                loader: "react-templates-loader"
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader?functions=selector-parse&root=" + path.resolve('./js')
            }, {
                test: /\.less$/,
                loader: "style!css!less"
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        noParse: [
            /Chart.bundle.min\.js/
        ],
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

module.exports = webpackConfig;