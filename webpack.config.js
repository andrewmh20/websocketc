const path = require('path')

module.exports = {
  entry: './src/frontend/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'bundle.js',
  },
  mode: 'development',
}
