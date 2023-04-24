import Express from "express";
import http from "http";
import apiRouter from "./routes/api.route.js";

const PORT = 3000;
const app = Express();

const allowedOrigins = ["http://localhost:5173"];

app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  next();
});

app.use("/api", apiRouter);

http
  .createServer(app)
  .listen(PORT, () => console.log("Listening on PORT " + PORT));
