import fetch  from 'node-fetch';
const vencidas = [
    {
        "no_factura": "FS-4541790",
        "codigo": 599428,
        "nombre titular": "SLIGHNS LEXINE",
        "telefono_movil": "809-284-0784",
        "vencimiento_factura": "2022-112-21"
    },

    {
        "no_factura": "FS-4541790",
        "codigo": 599428,
        "nombre titular": "SLIGHNS LEXINE",
        "telefono_movil": "8297938700",
        "vencimiento_factura": "2022-112-21"
    },
    {
        "no_factura": "FS-4541800",
        "codigo": 599428,
        "nombre titular": "DULUC LUIS T",
        "telefono_movil": "829-729-8373",
        "vencimiento_factura": "2022-112-21"
    },

]


const trigger = () => {

    vencidas.forEach(factura => {
        const sender = {
    
            "clientKey": "116ac6f7-08a7-4180-95e4-bb05dc551597",
        
            "celular": factura.telefono_movil,
        
            "mensaje": `Estimado cliente, le informamos su factura no ${factura.no_factura} emitida en fecha vencerá el día ${factura.vencimiento_factura} por lo que recomendamos el pago de su facturación de agua y no acumular deudas a fin de evitar cargos por mora y suspensión del servicio`,
        
            "referencia": "prueba"
        }
        
        fetch('https://smsapi.barolit.net/Sms?116ac6f7-08a7-4180-95e4-bb05dc551597', {
        method:'post',
        body: JSON.stringify(sender),
        headers: {'Content-Type':'application/json'}
       
        
    });
	//console.log(sender)
})
}
   

trigger();

    









