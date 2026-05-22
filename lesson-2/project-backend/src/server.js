import express from "express";
import cors from "cors";
import pino from "pino-http";
import {readFile} from "node:fs/promises";

const app = express(); // app - web-server

app.use(express.json());
app.use(cors());
// const corsMiddleware = cors();
// app.use(corsMiddleware);
/*
const cors = options => {
  const middleware = (req, res, next)=> {
    // add options
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    next();
  }
  return middleware;
}
*/

// app.use((req, res, next)=> {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
  // next();
// });

const logger = pino({
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "HH:MM:ss",
    ignore: "pid,hostname",
    messageFormat: "{req.method} {req.url} {res.statusCode} - {responseTime}ms",
    hideObject: true
  }
});
app.use(logger);

// app.use((req, res, next)=> {
//   console.log("First middleware");
//   next();
// });

// app.use((req, res, next)=> {
//   console.log("Second middleware");
//   next();
// });

app.get("/", (req, res)=> {
  res.send("<h1>Home page</h1>");
});

app.get("/contacts", (req, res)=> {
  // console.log(req.url);
  // console.log(req.method);
  res.json({
    message: "Call all contacts"
  });
});

app.get("/contacts/:id", (req, res)=> {
  const {id} = req.params;
  res.json({
    message: `Get contact with id=${id}`
  });
});

app.get("/users", async (req, res)=> {
  const data = await readFile("src/user.json", "utf-8"); // throw new Error("ENOENT: no such file or directory")
  res.json(JSON.parse(data));
});

app.use((req, res)=> {
  res.status(404).json({
    message: `Route ${req.method} ${req.url} not found`
  });
});

app.use((error, req, res, next)=> {
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction ? "Some error" : error.message;
  res.status(500).json({
    message,
  });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, ()=> console.log(`Server running on 3000 port`));

