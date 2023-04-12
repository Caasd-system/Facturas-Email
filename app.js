import express from 'express';
import clients_data  from './factura.js'

import puppeteer from 'puppeteer';
import pug from 'pug'
import fs from 'fs'
 
    let factura = clients_data
    const recursos = {
       data: factura.items,
       css: '/style.css'

    }

    
  
  
      
    function compilePugToHtml(file) {
      return pug.renderFile(file, recursos);
    }


    (async () => {
      const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
      const page = await browser.newPage();
    
      // Leer el archivo Pug y compilarlo a HTML
      const html = await compilePugToHtml('./views/index.pug');
    
      // Cargar los estilos CSS y aplicarlos al PDF generado
      const css = fs.readFileSync('./public/style.css', 'utf8');
    
     
      await page.setContent(html);
      await page.addStyleTag({content: css});
 

    
      // Generar el PDF y guardarlo en disco
      await page.pdf({path: 'ejemplo.pdf', printBackground: true});
    
      await browser.close();
    })();
    
  


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