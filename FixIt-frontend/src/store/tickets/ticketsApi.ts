import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetTicketsParams,
  PaginatedTicketsResponse,
  TicketRequest,
  TicketResponse,
} from "./ticketsApi.types";

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    getAllTickets: builder.query<PaginatedTicketsResponse, GetTicketsParams>({
      query: (params) => ({
        url: "tickets",
        params,
      }),
      providesTags: ["Tickets"],
    }),
    createTicket: builder.mutation<TicketResponse, TicketRequest>({
      query: (body) => ({
        url: "tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const { useGetAllTicketsQuery, useCreateTicketMutation } = ticketsApi;
