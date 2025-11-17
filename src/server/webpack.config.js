const path = require('path');
const copy = require('copy-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: './index.ts',
    target: 'node',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externalsPresets: { 
        node: true 
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist'),
        clean: true
    },
    externals: [nodeExternals()],   // <-- NÃO bundle node_modules
    externalsPresets: { node: true },
    devtool: false,
    optimization: {
        minimize: true
    },
    plugins:[
        new copy({
            patterns:[
                {
                    from: path.resolve(__dirname, '../client/dist'),
                    to: path.resolve(__dirname,'./dist/public')
                }
            ]
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^pg-native$/,
            contextRegExp: /pg\/lib/, // Optional: Restrict to the pg library's context
        })
    ]
};
