var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var getPlugins = function () {
    var plugins = [];
    var node_env = new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    });
    var noErrorsPlugin = new webpack.NoErrorsPlugin();
    var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        },
        minimize: true
    });
    var clearDist = new CleanWebpackPlugin(['dist', 'serverDist'], {
      root: __dirname,
      verbose: true, 
      dry: false
    });

    plugins.push(node_env);
    plugins.push(clearDist);
    plugins.push(noErrorsPlugin);
    plugins.push(uglifyPlugin)

    var doneFunction = function () {
        this.plugin("done", function (stats) {
            setTimeout(function () {
                console.log('Client build finished!');
                // process.exit(0)
            }, 1000);
        });
    }

    plugins.push(doneFunction);

    return plugins;
};

var webpackConfig = {
    entry: {
        login: [
            __dirname + '/client/scripts/login.js'
        ],
        mainMenu: [
            __dirname + '/client/scripts/mainMenu.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: getPlugins(),
    externals: {},
    devtool: 'cheap-source-map',
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            query: {
                presets: ['es2015', 'react'],
                compact: true
            }
        }, {
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            query: {
                compact: true
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
        }],
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