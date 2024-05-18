const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000; // You can change this port if needed

// Log requests to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Proxy configuration
app.use('/', createProxyMiddleware({
  target: 'https://google.com', // Replace with the actual target server
  changeOrigin: true,
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    console.log('\\\\\\\\\\',req);
    console.log('\\\\\\\\\\',res);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('================',req);
    console.log('================',res);
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://127.0.0.1:${PORT}`);
});
