var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getPlugins = function () {
    var plugins = [];
    var hotReload = new webpack.HotModuleReplacementPlugin()
    var noErrorsPlugin = new webpack.NoErrorsPlugin();
    var clearDist = new CleanWebpackPlugin(['dist'], {
        root: __dirname,
        verbose: true,
        dry: false
    });
    var faviconLib = new FaviconsWebpackPlugin({
        // Your source logo
        logo: './public/trials-favicon-small-min.png',
        // The prefix for all image files (might be a folder or a name)
        prefix: 'icons-[hash]/',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'iconstats-[hash].json',
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',
        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        title: 'Trials Statistics Dashboard',

        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: true
        }
    });
    var htmlMain = new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['main'],
        filename: 'view/main.html',
        template: './client/view/main.html'
    });
    var htmlSeason1 = new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['season1'],
        filename: 'view/season1.html',
        template: './client/view/season1.html'
    });
    var htmlSeason2 = new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['season2'],
        filename: 'view/season2.html',
        template: './client/view/season2.html'
    });
    var htmlDonation = new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['donation'],
        filename: 'view/donate.html',
        template: './client/view/donate.html'
    });
    var htmlContacts = new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['contacts'],
        filename: 'view/contacts.html',
        template: './client/view/contacts.html'
    });

    plugins.push(clearDist);
    plugins.push(noErrorsPlugin);
    plugins.push(hotReload);
    plugins.push(faviconLib);
    plugins.push(htmlMain);
    plugins.push(htmlSeason1);
    plugins.push(htmlSeason2);
    plugins.push(htmlDonation);
    plugins.push(htmlContacts);

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
            'webpack-hot-middleware/client',
            __dirname + '/client/scripts/main.js'
        ],
        season1: [
            'webpack-hot-middleware/client',
            __dirname + '/client/scripts/season1.js'
        ],
        season2: [
            'webpack-hot-middleware/client',
            __dirname + '/client/scripts/season2.js'
        ],
        donation: [
            'webpack-hot-middleware/client',
            __dirname + '/client/scripts/donation.js'
        ],
        contacts: [
            'webpack-hot-middleware/client',
            __dirname + '/client/scripts/contacts.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        sourceMapFilename: "debugging/[file].map",
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: getPlugins(),
    externals: [],
    devtool: 'eval',
    // devtool: 'cheap-inline-module-source-map',
    // devtool: 'cheap-eval-source-map',
    module: {
        loaders: [{
                test: /.jsx?$/,
                include: [/client/],
                loaders: ['react-hot', 'babel'],
                exclude: [/node_modules/]
            },
            {
                test: /\.js$/,
                include: [/client/],
                exclude: [/node_modules/],
                loaders: ['react-hot', 'babel']
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
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                ]
            }, {
                test: /\.html$/,
                loader: 'html'
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