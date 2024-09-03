const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = (_env, argv) => {
    return {
        entry: './src/server.ts',
        target: 'node',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.js',
            clean: false
        },

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                 'handlebars' : 'handlebars/dist/handlebars.js'

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
                    use: ['ts-loader'],
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