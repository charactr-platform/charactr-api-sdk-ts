const path = require('path');

module.exports = {
    entry: './lib/sdk.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig.esnext.json",
                        }
                }],
                exclude: [
                    /node_modules/,
                    /spec\.ts/
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'sdk.esm.js',
        path: path.resolve(__dirname, 'dist'),
        module: true,
        libraryTarget: 'module'
    },
    experiments: {
        outputModule: true
    }
};
