const path = require("path");
const webpack = require("webpack");
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
                "@types": path.resolve(__dirname, "src", "types"),
                "@services": path.resolve(__dirname, "src", "server", "services"),
                "@validations": path.resolve(__dirname, "src", "server", "validations"),
                "@utils": path.resolve(__dirname, "src", "server", "utils"),
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
            { "kerberos": 'commonjs kerberos' },
            { "@mongodb-js/zstd": 'commonjs @mongodb-js/zstd' },
            { "@aws-sdk/credential-providers": 'commonjs @aws-sdk/credential-providers' },
            { "gcp-metadata": 'commonjs gcp-metadata' },
            { "snappy": 'commonjs snappy' },
            { "socks": 'commonjs socks' },
            { "aws4": 'commonjs aws4' },
            { "mongodb-client-encryption" : "commonjs mongodb-client-encryption"}
        ],

        plugins: [
            new webpack.ContextReplacementPlugin(/express/, /mongodb/),
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