const express = require('express')
const data = require('./model/test');

const app = express()
const port = 3000

app.use(express.static('public'));

// 相应html
app.get('/', (req, res) => {
  res.sendFile('index.html')
});

// 数据接口
app.get('/api/data', function(req, res) {
  res.json(data);
})

app.listen(port, () => console.log(`应用在 ${port} 端口处启动啦!`))