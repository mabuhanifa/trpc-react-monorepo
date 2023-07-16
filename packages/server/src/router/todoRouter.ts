import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),
});
