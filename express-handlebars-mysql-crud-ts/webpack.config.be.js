const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";

    return {
        entry: "./src/server.ts",

        target: "node",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "server.js"
        },

        watchOptions: {
            ignored: ["**/views", "**/node_modules"],
        },

        resolve: {

            alias: {
                "@src": path.resolve(__dirname, "src"),
                "handlebars": "handlebars/dist/handlebars.js"

            },

            extensions: [".ts", ".js"],
        },

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: ["ts-loader"],
                    exclude: /node_modules/,
                }
            ],
        },

        plugins: [
            new CopyPlugin({
                patterns: [
                    { 
                        from: path.resolve(__dirname, "src", "locales"), 
                        to: path.resolve(__dirname, "dist", "locales")
                    },
                ],
            }),
            new webpack.ContextReplacementPlugin(/express/)
        ],

        devtool: isProduction ? "source-map" : "inline-source-map"
    }
}