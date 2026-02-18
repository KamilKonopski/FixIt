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

export interface TicketNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorFullName: string;
}

export interface HistoryLog {
  id: string;
  description: string;
  createdAt: string;
  changedByUserId: string;
  userFullName: string;
}

export interface TicketDetailsResponse {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  clientId: string;
  clientName: string;
  technicianId?: string;
  technicianName?: string;
  ticketNotes: TicketNote[];
  historyLogs: HistoryLog[];
}
