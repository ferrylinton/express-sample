const path = require("path");
const fs = require('fs');
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (_env, argv) => {

    const isProduction = argv.mode === "production";
    let cssFilename = null;
    let jsFilename = null;

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
                    filename: isProduction ? "[name].[contenthash:8].js" : (({ hash, chunk }) => {
                        const newJsFilename = `${chunk.name}.${hash.slice(0, 8)}.js`;

                        try {
                            if (jsFilename && jsFilename !== newJsFilename) {
                                fs.unlinkSync(path.resolve(__dirname, "dist", "assets", "js", jsFilename));
                            } else if (!jsFilename) {
                                fs.rmSync(path.resolve(__dirname, "dist", "assets", "js"), { recursive: true, force: true });
                            }
                        } catch (error) {
                            console.log(error);
                        }


                        jsFilename = newJsFilename;
                        return jsFilename;
                    }),
                    outputPath: "assets/js/",
                },
                css: {
                    filename: isProduction ? "[name].[contenthash:8].css" : (({ contentHash, chunk }) => {
                        const newCssFilename = `${chunk.name}.${contentHash.slice(0, 8)}.css`;

                        try {
                            if (cssFilename && cssFilename !== newCssFilename) {
                                fs.unlinkSync(path.resolve(__dirname, "dist", "assets", "css", cssFilename));
                            } else if (!cssFilename) {
                                fs.rmSync(path.resolve(__dirname, "dist", "assets", "css"), { recursive: true, force: true });
                            }
                        } catch (error) {
                            console.log(error);
                        }

                        cssFilename = newCssFilename;
                        return cssFilename;
                    }),
                    
                    outputPath: "assets/css/"
                },
                preprocessor: false,
                minify: false,
            })
        ],

        devtool: isProduction ? "source-map" : "inline-source-map"

    }
}