export type TicketStatus =
  | "New"
  | "Assigned"
  | "InProgress"
  | "Resolved"
  | "Closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  clientId: string;
  technicianId?: string;
}

export const statusLabelMap: Record<TicketStatus, string> = {
  New: "Nowe",
  Assigned: "Przypisane",
  InProgress: "W trakcie",
  Resolved: "Rozwiązane",
  Closed: "Zamknięte",
};

export const statusColorMap: Record<TicketStatus, string> = {
  New: "fixit-blue",
  Assigned: "fixit-warning",
  InProgress: "fixit-blue",
  Resolved: "fixit-success",
  Closed: "gray",
};
