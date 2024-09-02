const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = (env, argv) => {
    return {
        entry: './src/server.ts',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.js'
        },
     
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
            ],
        },
        plugins: [].concat(argv.mode === 'development' ? [new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['node ./dist/server.js']
            }
        })] : [])
    }
}