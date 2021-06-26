module.exports = {
  mode: "development",
  entry: {
    task: `${__dirname}/src/task/index.ts`,
    timer: `${__dirname}/src/timer/index.ts`,
  },
  output: {
    path: `${__dirname}/../ap/backend/todo/static/dist`,
  },
  devServer: {
    contentBase: `${__dirname}/../ap/backend/todo/static/dist`,
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
