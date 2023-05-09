import Bull from "bull";
import emailSender from "./emailSender.js";
import pdf from "pdf-creator-node";
import fs from "fs";

const q = new Bull("email_invoice", {});

const pro = async (job, done) => {
  var { data } = job;
  var { cliente, factura } = data;

  var html = fs.readFileSync("./template.html", "utf8");

  var options = {
    format: "Letter",
    orientation: "portrait",
    border: "0mm",
    header: {
      height: "0mm",
      contents: ``,
    },
  };

  var filename = `factura_${factura.documento}.pdf`;

  var document = {
    html: html,
    data: { factura },
    path: `./pdfs/${filename}`,
    type: "",
  };

  var f = await pdf.create(document, options);
  if (!f) {
    console.log("No quiso hacer el pdf");
  }

  var filePath = f.filename;
  var attachments = [
    {
      filename,
      path: filePath,
      contentType: "application/pdf",
    },
  ];

  await emailSender(cliente.nombre_titular, cliente.email, attachments);
  done();
};

q.process(pro);

const procesoEnvio = async (data) => {
  q.add(data, {});
};

export default procesoEnvio;
