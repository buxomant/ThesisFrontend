var path = require('path');
var process = require('process');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var environment = process.env.ENV || 'development';

module.exports = {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'target')
    },
    devtool: getSourceMapType(),
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                'ts-loader'
            ]
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpg|png|otf|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000'
        }, {
            // This exposes jquery to the window, which is needed for knockout to parse templates (containing tr) properly.
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: '$'

            }, {
                loader: 'expose-loader',
                options: 'jQuery'
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['target']),
        new HtmlWebpackPlugin({template: 'src/app.ejs'}),
        new webpack.ProvidePlugin({
            config: path.resolve(__dirname, 'config', environment + '.json')
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './src')
        ]
    }
};

function getSourceMapType() {
    /**
     * We need inline source-maps to be able to use karma-webpack-loader, so useful line numbers are shown in test logs.
     * However, we want to separate them in production to avoid sending large js files.
     */
    return process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map';
}