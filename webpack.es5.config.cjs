const path = require('path');

module.exports = {
    entry: './lib/sdk.ts',
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig.json",
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
        filename: 'sdk.es5.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
