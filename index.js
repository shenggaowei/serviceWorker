const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const root = path.join(__dirname, 'src')

app.use(express.static('src'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))