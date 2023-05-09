const data = {};

data.getFactura = () => {
  return {
    items: {
      documento: "FS-3283122",
      id_contrato: "587643",
      id_cliente: "587643",
      estrato: "5",
      nombre_cte: "M-J E-6 APTO. 302 ",
      monto_neto: 230.4,
      fecha_venc_ncf: "2022-12-31T04:00:00.000Z",
      direccion_cte: null,
      id_moneda: "RD",
      id_periodo: "202205",
      unidades: 1,
      tasa_moneda: 1,
      documento_identidad: null,
      periodo: "Mayo-2022",
      fecha_factura: "2022-05-13T04:00:00.000Z",
      fecha_venc: "2022-06-12T04:00:00.000Z",
      ncf: "B0218952568",
      id_tipo_trans: "FS",
      id_documento: "3283122",
      clase_servicio: "Residencial",
      zona: "32C",
      codigo_proceso: "32473420401",
      cod_inmueble: "325150022000705-0036",
      tipo_comp: "Factura Para Consumidor Final",
      notas: null,
      notas_1: null,
      notas_2:
        "Actualiza Tus Datos.\r\n(Codigo Sistema, Nombre, Direccion, Telefono, Email).\r\nEn La Sucursal Mas Cercana O Envialos Al Correo Servicioalcliente@Caasd.Gob.Do.\r\nA Partir 01 De Junio Iniciamos Con Envío De Factura Electrónica",
      coletilla: null,
      lectura_anterior: null,
      lectura: null,
      fecha_lectura_ant: null,
      fecha_documento: "2022-05-13T04:00:00.000Z",
      serial: null,
      consumo: 32,
      calibre: null,
      metodo: "P",
      fecha_lectura: "2022-05-13T04:00:00.000Z",
      medidor: null,
      base_mora: null,
      no_periodo_mora: null,
      f_ult_pago: "2022-02-14T21:32:01.000Z",
      monto_ult_pago: 1393.28,
      importe_total: 230.4,
      saldo_anterior: 691.2,
      detalle: [
        {
          descripcion_producto1: "Agua ",
          descripcion_producto2: "Consumo 1",
          cantidad: 32,
          precio: 6,
          importe: 192,
          tiene_det: 6,
          id_clasificacion: "1",
          basico: "A",
          id_producto: "1",
        },
        {
          descripcion_producto1: "Agua ",
          descripcion_producto2: "Consumo 1",
          cantidad: 32,
          precio: 6,
          importe: 192,
          tiene_det: 6,
          id_clasificacion: "1",
          basico: "B",
          id_producto: "1",
        },
        {
          descripcion_producto1: "Alcantarillado ",
          descripcion_producto2: "Consumo 1",
          cantidad: 6.4,
          precio: 6,
          importe: 38.4,
          tiene_det: 16,
          id_clasificacion: "14",
          basico: "A",
          id_producto: "2",
        },
      ],
    },
  };
};

data.getClientes = () => {
  return [
    {
      codigo_sistema: "45592",
      nombre_titular: "TORRE LA DIANA 2",
      email: "info@factoria.tech",
      fecha_factura: "2023-05-04T00:00:00.000Z",
      no_factura: "FS-5983924 ",
    },
  ];
};

export default data;
