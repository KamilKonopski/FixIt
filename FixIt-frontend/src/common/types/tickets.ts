export type TicketStatus =
  | "New"
  | "Assigned"
  | "InProgress"
  | "Resolved"
  | "Closed";

export type SortOption = "Asc" | "Desc";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  clientId: string;
  technicianId?: string;
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

export interface TicketDetails {
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
