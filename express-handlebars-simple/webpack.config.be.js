const path = require("path");
const webpack = require("webpack");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";

    return {

        entry: "./src/server.js",

        target: "node",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "server.js",
            clean: false
        },

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "handlebars": "handlebars/dist/handlebars.js"

            },
            modules: [
                "node_modules"
            ]
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