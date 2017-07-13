var IS_DEV = (process.env.NODE_ENV === 'development');

var devConfig = {
  port: process.env.PORT || 8000,
  raiz: __dirname,
  API_HOST: process.env.API_HOST || 'http://localhost:3000',
  TOKEN_NAME: process.env.TOKEN_NAME || 'token',
  TOKEN_PREFIX: process.env.TOKEN_PREFIX || `PREFIX_DEV_${Math.random().toFixed(2)}`
};

var prodConfig = {
  port: process.env.PORT || 8000,
  raiz: __dirname,
  API_HOST: process.env.API_HOST || 'http://192.168.43.113:3000',
  TOKEN_NAME: process.env.TOKEN_NAME || 'token',
  TOKEN_PREFIX: process.env.TOKEN_PREFIX || `PREFIX_PROD_${Math.random().toFixed(2)}`
}

module.exports = IS_DEV ? devConfig : prodConfig; 