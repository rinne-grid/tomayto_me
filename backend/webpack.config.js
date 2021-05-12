module.exports = {
  mode: "development",
  entry: {
    task: `${__dirname}/todo/static/src/task/index.ts`,
  },
  output: {
    path: `${__dirname}/todo/static/dist`,
  },
  devServer: {
    contentBase: `${__dirname}/todo/static/dist`,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
