module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
