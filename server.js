const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
 
// 设置静态文件目录
app.use(express.static('dist'));
 
// 设置代理规则
app.use('/api', createProxyMiddleware({
  target: 'http://policy.staging.mifi.pt.xiaomi.com', // 目标后端服务器地址
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));
 
// 监听3000端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});