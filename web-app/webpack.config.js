const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    favicon: "./public/favicon.ico",
    filename: "./index.html"
});

const cssPlugin = new MiniCssExtractPlugin({
    filename: "./index.css",
});


module.exports = {
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './index.js',
        publicPath: '/'
    },
    devServer: {
        watchFiles: ["src/**/*", "public/**/*"],
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2,
                    }
                },
                  "postcss-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                loader: "@svgr/webpack",
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'removeViewBox',
                                active: true,
                            }
                        ]
                    }
                }
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                use: [
                {
                  loader: "url-loader",
                  options: {
                    limit: 10000
                  }
                }
              ]
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [htmlPlugin, cssPlugin]
};
