import dotenv from "dotenv";
dotenv.config();

import express from "express";
import enviarEmails from "./enviarEmails.js";

const app = express();

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});

await enviarEmails();
