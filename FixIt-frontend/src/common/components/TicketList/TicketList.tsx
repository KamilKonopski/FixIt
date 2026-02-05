import { Stack, Text } from "@mantine/core";

import TicketItem from "./TicketItem/TicketItem";

import type { Ticket } from "../../types/tickets";

interface TicketListProps {
  tickets: Ticket[];
  emptyLabel?: string;
  onItemClick?: (ticket: Ticket) => void;
}

const TicketList = ({ tickets, emptyLabel, onItemClick }: TicketListProps) => {
  if (tickets.length === 0) {
    return (
      <Text c="dimmed" ta="center" mt="lg">
        {emptyLabel}
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} onClick={onItemClick} />
      ))}
    </Stack>
  );
};

export default TicketList;
