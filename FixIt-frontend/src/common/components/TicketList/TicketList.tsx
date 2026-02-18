import { Stack, Text } from "@mantine/core";

import TicketItem from "./TicketItem/TicketItem";

import type { Ticket } from "../../types/tickets";

interface TicketListProps {
  tickets: Ticket[];
  emptyLabel?: string;
}

const TicketList = ({ tickets, emptyLabel }: TicketListProps) => {
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
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </Stack>
  );
};

export default TicketList;
