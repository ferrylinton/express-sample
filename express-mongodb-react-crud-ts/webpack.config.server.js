const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_env, argv) => {

    return {
        entry: path.resolve(__dirname, "src", "server", "server.ts"),

        target: "node",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "server.js"
        },

        watchOptions: {
            ignored: ["**/client", "**/node_modules"],
        },

        resolve: {

            alias: {
                "@src": path.resolve(__dirname, "src"),
            },

            extensions: ["", ".ts", ".js", ".node"]
        },

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: "ts-loader",
                    options: { configFile: 'tsconfig.server.json' },
                    exclude: [path.resolve(__dirname, "src", "client"), path.resolve(__dirname, 'node_modules')],
                },
                {
                    test: /\.node$/,
                    loader: "node-loader"
                }
            ],
        },

        externals: [
            { express: 'commonjs express' },
            { mongodb: 'commonjs mongodb' }
        ],

        plugins: [
            new CopyPlugin({
                patterns: [
                    path.resolve(__dirname, ".env"),
                    path.resolve(__dirname, "package.json"),
                    path.resolve(__dirname, "src", "favicon.ico")
                ],
            }),
        ],
    }
}