import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Tytuł musi mieć co najmniej 10 znaków")
    .max(100, "Tytuł nie może mieć więcej niż 100 znaków"),
  description: z
    .string()
    .trim()
    .min(20, "Opis musi mieć co najmniej 20 znaków"),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
