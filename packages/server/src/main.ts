import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { appRouter } from "./router";

const app: Application = express();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json({ hello: "world" });
});

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
