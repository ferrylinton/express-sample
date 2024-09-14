const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";

    return {

        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "/"
        },

        watchOptions: {
            ignored: ["server.ts", "app.ts", "**/config", "**/routers", "**/services", "**/types", "**/node_modules"],
        },

        resolve: {
            alias: {
                "@src": path.join(__dirname, "src"),
            },
            extensions: [".js", ".ts"],
        },

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: ["ts-loader"],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ["css-loader", "postcss-loader"]
                },
                {
                    test: /[\\/]image[\\/].+(png|jpe?g|svg|webp|ico)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "assets/image/[name].[hash:8][ext]",
                    }
                },
                {
                    test: /favicon.ico/,
                    type: "asset/resource",
                    generator: {
                        filename: "favicon.ico"
                    },
                }
            ],
        },

        optimization: {
            minimizer: [new CssMinimizerPlugin(), "..."]
        },

        plugins: [
            new HtmlBundlerPlugin({
                entry: "src",
                js: {
                    filename: "[name].[contenthash:8].js",
                    outputPath: "assets/js/",
                },
                css: {
                    filename: "[name].[contenthash:8].css",
                    outputPath: "assets/css/"
                },
                preprocessor: false,
                minify: false,
            })
        ],

        devtool: isProduction ? "source-map" : "inline-source-map"

    }
}