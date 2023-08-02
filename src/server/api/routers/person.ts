import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
//import { Gender } from "@prisma/client";

const personSchema = z.object(
  {
    fName: z.string(),
    lName: z.string(),
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
  create: protectedProcedure.input(personSchema).mutation(({ ctx, input }) => {
    const { fName, lName, email, gender } = input;

    console.log("input", input);
    return ctx.prisma.person.create({
      data: {
        fName,
        lName,
        email,
        gender: Gender[gender],
      },
    });
  }),
});
