import express from 'express';
import { factura_data }  from './factura.js'
import clients_data  from './Clientes.js';
import puppeteer from 'puppeteer';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

app.set('views', './views')

app.set('view engine', 'pug')

app.use(express.static('public'))



async function procesarClientes() {
  const resultadosFacturas = [];
  for (const currentClient of clients_data) {
    const CodigoFactura = currentClient.no_factura.split("-");
    const resultadoFactura = await factura_data(CodigoFactura[0], CodigoFactura[1]);
    resultadosFacturas.push(resultadoFactura);
  }
  return resultadosFacturas;
}


function newPdf(factura){


            const recursos = {
                data: factura.items,
                css: '/style.css',
                imgHeader: '/img/factura-header.jpg'
                }
            return recursos
}

         
procesarClientes()
  .then((resultadosFacturas) => {
    const resultados = resultadosFacturas.map(factura => newPdf(factura)).filter(resultado => resultado);
    //console.log(resultados[0].data)
    return resultados[0].data;
  })
  .then(async (resultados) => { // Convertir el callback en una función asincrónica para usar await
    app.get('/template', (req, res) => {
      res.render('index.pug', { resultados });
    });
  

    try { // Manejar los errores de Puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const fileName = 'ejemplo.pdf'

      await page.goto('http://localhost:3000/template');

      await page.pdf({
        path: fileName,
        width: '820px',
        height: '1370px',
        printBackground: true,
      });

      await browser.close();

    } catch (error) {
      console.error(error);
      res.status(500).send('Error al generar el PDF');
    }
    
  
  });


       
