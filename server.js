var koa = require('koa');
var app = koa();
app.use(require('koa-static')('./www'));
app.listen(7000);
console.log('server start on port 7000');
