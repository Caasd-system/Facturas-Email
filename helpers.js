import fetch from "node-fetch";
import dummy from "./dummyData.js";
import fs from "fs";

var urlClientes = "http://10.20.30.3:8450/api/v1/clientes";

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  const buf = Buffer.from(bitmap, "utf8");
  return buf.toString("base64");
}

var helpers = {};

helpers.money = (num) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "DOP",
  });
  return formatter.format(num);
};

///Esta funcion jala los emails
helpers.getAllEmails = async () => {
  // const response = await fetch(urlClientes);
  // return response.json();
  return dummy.getClientes();
};

//esta funcion busca los detalles de 1 factura
helpers.getFactura = async (tipo, factura) => {
  // const response = await fetch(
  //   `https://webservice.caasd.gob.do:8443/api/factura?id_tipo_trans=${tipo}&id_documento=${factura.trim()}`
  // );
  // return await response.json();
  return dummy.getFactura();
};

helpers.getTemplateData = (data) => {
  var factura = data.items;
  var { detalle } = factura;
  detalle = detalle.map((d) => {
    return {
      ...d,
      precio: helpers.money(d.precio),
      importe: helpers.money(d.importe),
    };
  });
  const detallesa = detalle.filter((x) => x.basico === "A");
  const detallesb = detalle.filter((x) => x.basico === "B");
  delete factura.detalle;
  factura.monto_neto = helpers.money(factura.monto_neto);
  factura.monto_ult_pago = helpers.money(factura.monto_ult_pago);
  factura.importe_total = helpers.money(factura.importe_total);
  factura.saldo_anterior = helpers.money(factura.saldo_anterior);
  factura.imgHeader = base64_encode("./images/factura-header.jpg");
  factura.imgLogoCaasdAzul = base64_encode("./images/logo-caasd-azul.png");
  factura.imgtextoLogoCaasdAzul = base64_encode(
    "./images/texto-logo-caasd-azul.png"
  );
  return {
    ...factura,
    detallesa,
    detallesb,
  };
};

export default helpers;
