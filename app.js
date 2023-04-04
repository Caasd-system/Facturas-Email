import express from 'express';
import clients_data  from './factura.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.set('views', './views')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/template', (req, res) => {
    res.render('index.pug', {clients_data} ); 
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})