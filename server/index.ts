import { createExpressApp } from "remix-express-vite-plugin/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";

declare module "@remix-run/node" {
  interface AppLoadContext {}
}

export default createExpressApp({
  configure: (app) => {
    app.use(compression());
    app.disable("x-powered-by");
    app.use((req, res, next) => { 
      req.headers["x-client-ip"] = req.headers["x-forwarded-for"] || req.socket.remoteAddress; 
      next(); 
    });
    app.use(morgan("tiny"));
  },
  getLoadContext: async (req, res) => {
    return { };
  },
});