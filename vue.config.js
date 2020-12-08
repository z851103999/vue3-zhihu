module.exports = {
  devServer: {
    // host: '0.0.0.0',
    port: 8000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://apis.imooc.com',
        changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  }
}
