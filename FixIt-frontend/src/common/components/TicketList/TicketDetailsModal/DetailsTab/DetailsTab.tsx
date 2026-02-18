import {
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Divider,
  SimpleGrid,
} from "@mantine/core";

import InfoItem from "./InfoItem/InfoItem";

import {
  statusLabelMap,
  statusColorMap,
  type TicketDetails,
} from "../../../../types/tickets";

type TicketDetailsData = Omit<TicketDetails, "ticketNotes" | "historyLogs">;

interface DetailsTabProps {
  ticket: TicketDetailsData;
}

const DetailsTab = ({ ticket }: DetailsTabProps) => {
  return (
    <Stack gap="lg">
      <Card p="lg" radius="md">
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <Text size="xl" fw={700}>
              {ticket.title}
            </Text>
            <Badge
              color={statusColorMap[ticket.status]}
              variant="light"
              radius="sm"
            >
              {statusLabelMap[ticket.status]}
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            {ticket.description || "Brak opisu zgłoszenia."}
          </Text>
        </Stack>
      </Card>
      <Card p="lg" radius="md">
        <Stack gap="md">
          <Text fw={600}>Szczegóły zgłoszenia</Text>
          <Divider />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            <InfoItem label="ID zgłoszenia" value={ticket.id} />
            <InfoItem
              label="Data utworzenia"
              value={new Date(ticket.createdAt).toLocaleDateString()}
            />
            <InfoItem label="Technik" value={ticket.technicianName} />
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
};

export default DetailsTab;
