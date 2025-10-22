import express, { Application } from "express";
import "reflect-metadata";
const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/app/tasks");
app.get("/", (req, res) => {
  res.send("Task mangr api running");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
