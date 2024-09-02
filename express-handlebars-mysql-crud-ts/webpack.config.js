const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server.ts',
    mode: 'development',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

}