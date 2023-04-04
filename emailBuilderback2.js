import fetch  from 'node-fetch';
import  SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv'
dotenv.config();

//const 'http://10.20.30.3:8450/api/v1/clientes' = process.env.'http://10.20.30.3:8450/api/v1/clientes'

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDING_BLUE_API_KEY 

try {

  /* THIS EMAIL LIST IS USE WHEN THERE ARE NOT INVOICES ISSUED, TO SEND A NOTIFICATION TO 
  THE FOLLOW LIST */
  const notEmailNotification = [{'email':'danni.tavarez@caasd.gob.do.com', 'name':'Danni Tavarez'},
  {'email':'lucero.concepcion@caasd.gob.do', 'name':'Lucero Concepcion'},
  {'email':'ditic.seguridad@caasd.gob.do', 'name':'Seguridad'}]



  // GET THE LIST OF EMAILS OF THE CLIENTS WHO INVOICES HAS ISSUED
  const response = await fetch('http://10.20.30.3:8450/api/v1/clientes');
  const clients_data = await response.json();


  // Use sendinBlue to send an email to the clients.
  const sentEmails = (cliente, templateId, subject) => { 
		console.log("enviando correo")
  
  
      new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
          {
            'subject':subject,
            'sender' : {'email':'facturacion@caasd.gob.do', 'name':'CAASD'},
            'to' : cliente,
            'replayTo' : {'email':'facturacion@caasd.gob.do', 'name':'CAASD'},
            'templateId': templateId,
          }
        ).then(function(data) {
          console.log(data);
        }, function(error) {
          console.error(error + "SendingBlue");
      }); 

  }

  //CHECK WHITCH TEMPLATE IS GOING TO BE USE IN THE EMAIL.
  let templateId = (clients_data.length == 0) ? 3 : 2

  //CHECK WHITCH EMAIL SHULD BE SEND. 
  let client = (clients_data.length == 0) ? notEmailNotification: clients_data

  const logMessage = (body)=>{
	  console.log(body)
	  console.log("star fetch to message")
    fetch('http://10.20.30.3:8450/api/v1/clientes', {
      method:'post',
      body: JSON.stringify(body),
      headers: {'Content-Type':'application/json'}

    });
    
  }

  const insertar_correos = (body)=>{
	  
	  console.log("star fetch to insert")
	  console.log(body)
    fetch('http://10.20.30.3:8450/api/v1/clientes/correos', {
      method:'post',
      body: JSON.stringify(body),
      headers: {'Content-Type':'application/json'}

    });
    
  }

  const sendEmailParams = (client,templateId) => {
    if (clients_data.length != 0){
		console.log('Start')
		for (let i = 0; i < clients_data.length; i++) {
			sentEmails(clients_data[i], templateId,'Factura CAASD')
			//insertar_correos(clients_data[i])
		}
      /*clients_data.forEach(client => {		  
        sentEmails([client], templateId,'Factura CAASD')
		console.log(client)
		console.log('enviando otro_correo')
       	          //logMessage({"message": "Correos enviados"})
		console.log('enviando creando_log')
     
      })*/
	  //clients_data.forEach(client => {	insertar_correos(client)
	 // console.log('Insertando_clientes')
	 
	  
    }else{
      sentEmails(client ,templateId,'Notificacion Mi factura');
      logMessage({"message": "No se encontraron correos"})
    }

  }

  sendEmailParams(client,templateId);


} catch(error){
 
  const body = {"message":"Log error: " + " " + error.message}
  console.log(body)
  const response = await fetch('http://10.20.30.3:8450/api/v1/clientes', {
    method:'post',
    body: JSON.stringify(body),
    headers: {'Content-Type':'application/json'}

  });
 
}