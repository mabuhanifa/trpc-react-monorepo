import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { appRouter } from "./router";

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello world!" });
});

app.use(cors());

app.use(
  "trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
