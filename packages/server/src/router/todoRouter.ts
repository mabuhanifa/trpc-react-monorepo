import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(() => {
    return prisma.todo.findMany();
  }),
  create: trpc.procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ input }) => {
      const title = input.title;
      return prisma.todo.create({
        data: {
          title: title,
          isCompleted: false,
        },
      });
    }),
  delete: trpc.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
