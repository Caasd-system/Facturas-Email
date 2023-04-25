import fetch  from 'node-fetch';
import clients_data from './Clientes.js'


export async function factura_data(tipo, factura ){
    const response = await fetch(`https://webservice.caasd.gob.do:8443/api/factura?id_tipo_trans=${tipo}&id_documento=${factura.trim()}`);
    const factura_data = await response.json();
    return factura_data;

}


