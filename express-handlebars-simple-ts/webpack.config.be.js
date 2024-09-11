const path = require("path");
const webpack = require("webpack");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";

    return {
        entry: "./src/server.ts",

        target: "node",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "server.js",
            clean: !isProduction,
        },

        resolve: {

            alias: {
                "@src": path.resolve(__dirname, "src"),
                 "handlebars" : "handlebars/dist/handlebars.js"

            },

            extensions: [".ts", ".js"],
        },

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: ["ts-loader"],
                    exclude: /node_modules/,
                },
            ],
        },

        plugins: [
            new webpack.ContextReplacementPlugin(/express/)
        ].concat(isProduction ? [] : [new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ["node ./dist/server.js"]
            }
        })]),

        devtool: isProduction ? "source-map" : "inline-source-map"
    }
}