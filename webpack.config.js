const HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
var ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    devtool: 'inline-source-map',
    output: {filename: 'bundle.js', publicPath: ''},
    module: {
        rules: [{
            test: /\.(m?js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"]
                }
            }
        },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({title: 'example', template: './src/index.html'}),
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin(),

    ],
}
