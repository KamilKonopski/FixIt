import { useState } from "react";
import { Badge, Card, Group, Stack, Text, Box, Button } from "@mantine/core";

import Modal from "../../Modal/Modal";
import TicketDetailsModal from "../TicketDetailsModal/TicketDetailsModal";

import { textTruncate } from "../../../utils/textTruncate";

import {
  statusColorMap,
  statusLabelMap,
  type Ticket,
} from "../../../types/tickets";

interface TicketItemProps {
  ticket: Ticket;
}

const TicketItem = ({ ticket }: TicketItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card radius="md" p="md" withBorder>
        <Group justify="space-between" align="center">
          <Stack gap={6}>
            <Group gap="sm">
              <Text fw={600}>{ticket.title}</Text>
              <Badge color={statusColorMap[ticket.status]}>
                {statusLabelMap[ticket.status]}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" lineClamp={2}>
              {textTruncate(ticket.description, 100)}
            </Text>
            <Group gap="lg" mt={4}>
              <Text size="xs" c="dimmed">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </Text>
            </Group>
          </Stack>
          <Box>
            <Button onClick={() => setIsOpen(true)}>Zobacz szczegóły</Button>
          </Box>
        </Group>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isButtonClose
        maxWidth={1200}
      >
        <TicketDetailsModal ticketId={ticket.id} />
      </Modal>
    </>
  );
};

export default TicketItem;
