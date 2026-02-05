import { Badge, Card, Group, Stack, Text, Box } from "@mantine/core";

import {
  statusColorMap,
  statusLabelMap,
  type Ticket,
} from "../../../types/tickets";

interface TicketItemProps {
  ticket: Ticket;
  rightSection?: React.ReactNode;
  onClick?: (ticket: Ticket) => void;
}

const TicketItem = ({ ticket, rightSection, onClick }: TicketItemProps) => {
  return (
    <Card
      radius="md"
      p="md"
      withBorder
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={() => onClick?.(ticket)}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={6}>
          <Group gap="sm">
            <Text fw={600}>{ticket.title}</Text>
            <Badge color={statusColorMap[ticket.status]}>
              {statusLabelMap[ticket.status]}
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" lineClamp={2}>
            {ticket.description}
          </Text>
          <Group gap="lg" mt={4}>
            <Text size="xs" c="dimmed">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </Text>
            <Text
              size="xs"
              c={ticket.technicianId ? "dimmed" : "fixit-warning"}
            >
              {ticket.technicianId
                ? `Technik: ${ticket.technicianId}`
                : "Brak przypisanego technika"}
            </Text>
          </Group>
        </Stack>
        {rightSection && <Box>{rightSection}</Box>}
      </Group>
    </Card>
  );
};

export default TicketItem;
