const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development', // 개발용 환경 설정
  entry: './src/index.js', // 진입점 설정
  output: {
    path: __dirname + '/dist', // 출력 파일 디렉터리
    filename: 'bundle.js' // 출력 파일 이름
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자를 가진 파일들을
        exclude: /node_modules/, // node_modules 제외
        use: {
          loader: "babel-loader", // babel-loader를 사용
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@component': path.resolve(__dirname, 'src/component/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@sidebar': path.resolve(__dirname, 'src/component/sidebar/'),
      '@sidebar/profile': path.resolve(__dirname, 'src/component/sidebar/profile/'),
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html", // HTML 템플릿 위치
      filename: "index.html" // 출력 HTML 파일명
    })
  ],
  devServer: {
    static: './dist',
    hot: true, // 핫 리로딩 활성화
    historyApiFallback: true
  }
};
