const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL_PROXY } = require("./enviromentalConstants");

const proxy = {
  target: API_URL_PROXY,
  changeOrigin: true,

}

module.exports = function(app) {
  app.use(
    '/interaluse2021',
    createProxyMiddleware(proxy)
  );
};