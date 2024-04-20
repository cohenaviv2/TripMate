import express, { Express } from "express";
import tripRoute from "./routes/tripRoute";

function initServer() {
  const promise = new Promise<Express>((resolve) => {
    const app = express();
    app.use(express.json());
    app.use("/trip", tripRoute);

    resolve(app);
  });

  return promise;
}

export default initServer;
