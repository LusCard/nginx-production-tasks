import { createApp } from "./app";
import envs from "./config/envs.config";
import { PostgreConfig } from "./config/postgre-db.config";
import { ConnectDB } from "./database/interfaces/connect-db";

async function start() {
  const app = createApp();
  const port = envs.PORT;

  app.listen(port, async () => {
    await ConnectDB.getInstance(new PostgreConfig()).connect();
    console.log(`Server running on port: ${port}`);
  });
}
start();
