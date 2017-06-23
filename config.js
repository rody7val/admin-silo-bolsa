var IS_DEV = (process.env.NODE_ENV === 'development');

var devConfig = {
  port: process.env.PORT || 8000,
  raiz: __dirname,
  API_HOST: "http://localhost:3000"
};

var prodConfig = {
  port: process.env.PORT || 8000,
  raiz: __dirname,
  API_HOST: "http://192.168.43.113:3000"
}

module.exports = IS_DEV ? devConfig : prodConfig;