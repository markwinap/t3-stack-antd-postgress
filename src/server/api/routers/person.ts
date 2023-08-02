import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
//import { Gender } from "@prisma/client";

const personSchema = z.object(
  {
    name: z.string(),
    email: z.string(),
    //gender: z.nativeEnum(Gender),
  }
)

export const personRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.person.findMany();
  }),
  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.person.findUnique({
      where: {
        id: input,
      },
    });
  }),
  create: protectedProcedure.input(personSchema).mutation(({ ctx, input }) => {
    const { name, email } = input;

    console.log("input", input);
    return ctx.prisma.person.create({
      data: {
        name,
        email,
        //gender: Gender[gender],
      },
    });
  }),
});
