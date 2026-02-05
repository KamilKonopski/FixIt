export type TicketStatus =
  | "New"
  | "Assigned"
  | "InProgress"
  | "Resolved"
  | "Closed";

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
