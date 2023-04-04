import fetch  from 'node-fetch';



const response = await fetch('https://webservice.caasd.gob.do:8443/api/factura?id_tipo_trans=FS&id_documento=3283122');
const clients_data = await response.json();


export default clients_data