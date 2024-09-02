const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = (env, argv) => {
    return {
        entry: './src/server.ts',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
        },
        externals: [nodeExternals()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
            modules: [
                "node_modules"
            ],
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['css-loader']
                },
                {
                    test: /[\\/]image[\\/].+(png|jpe?g|svg|webp|ico)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/image/[name].[hash:8][ext]',
                    }
                },
                {
                    test: /favicon.ico/,
                    type: "asset/resource",
                    generator: {
                        filename: 'favicon.ico'
                    },
                }
            ],
        },
        plugins: [
            new HtmlBundlerPlugin({
                entry: 'src/',
                entryFilter: (file) => {
                    if (/server/.test(file)) return false;
                },
                filename: '[name].js',
                js: {
                    filename: 'assets/js/[name].[contenthash:8].js'
                },
                css: {
                    filename: 'assets/css/[name].[contenthash:8].css'
                },
                preprocessor: false,
                minify: 'auto',
            })
        ].concat(argv.mode === 'development' ? [new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['node ./dist/server.js']
            }
        })] : [])

    }
}