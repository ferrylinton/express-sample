const path = require("path");
const webpack = require("webpack");

module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";

    return {
        entry: path.resolve(__dirname, "src", "server", "main.ts"),

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
                "@src": path.resolve(__dirname, "src", "server"),
            },

            extensions: [".ts", ".js"],
        },

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: "ts-loader",
                    options: { configFile: 'tsconfig.server.json' },
                    exclude: [path.resolve(__dirname, "src", "client"), path.resolve(__dirname, 'node_modules')],
                }
            ],
        },

        plugins: [
            new webpack.ContextReplacementPlugin(/express/)
        ],
    }
}