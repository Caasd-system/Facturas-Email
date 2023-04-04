import fetch  from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();
const API_URL = process.env.API_URL

const email_notification_list = [
    {'email':'danni.tavarez@caasd.gob.do.com', 'name':'Danni Tavarez'},
    {'email':'lucero.concepcion@caasd.gob.do', 'name':'Lucero Concepcion'},
    {'email':'ditic.seguridad@caasd.gob.do', 'name':'Seguridad'}
]

const response = await fetch(API_URL);
const clients_email_list = await response.json();

export default {clients_email_list, email_notification_list}