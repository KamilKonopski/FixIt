export type TicketStatus =
  | "New"
  | "Assigned"
  | "InProgress"
  | "Resolved"
  | "Closed";

export type SortDirection = "Asc" | "Desc";

export type GetTicketsParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: TicketStatus;
  sort?: SortDirection;
};

export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  clientId: string;
  technicianId?: string;
}

export interface TicketRequest {
  title: string;
  description: string;
}

export interface PaginatedTicketsResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  result: TicketResponse[];
}
