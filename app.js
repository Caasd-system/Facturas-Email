import express from 'express';
import clients_data  from './factura.js'
import puppeteer from 'puppeteer';

 

  

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
    
      // Navigate to the page with the image
      await page.goto('http://localhost:3000/template');
    
      // Generate the PDF with the image included
      await page.pdf({
        path: 'my-pdf-file.pdf',
        width: '820px',
        height: '1370px',
        printBackground: true,
      });
    
      await browser.close();
    })();
    
    
    
    
    let factura = clients_data
    const recursos = {
       data: factura.items,
       css: '/style.css',
       imgHeader: '/img/factura-header.jpg'

    }

    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.set('views', './views')

    app.set('view engine', 'pug')

    app.use(express.static('public'))

    app.get('/template', (req, res) => {
        res.render('index.pug', recursos ); 
    });
    
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })


   
   

  


        