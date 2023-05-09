import helpers from "./helpers.js";
import procesoEnvio from "./procesoEnvio.js";

const enviarEmails = async () => {
  var clientes = await helpers.getAllEmails();

  for (var i = 0; i < clientes.length; i++) {
    const str = clientes[i].no_factura;
    var arr = str.split("-");
    const rawData = await helpers.getFactura(arr[0], arr[1]);
    const factura = helpers.getTemplateData(rawData);
    await procesoEnvio({ cliente: clientes[i], factura });
  }
};

export default enviarEmails;
