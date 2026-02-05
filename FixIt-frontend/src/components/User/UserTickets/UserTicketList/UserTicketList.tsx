import {
  Container,
  Paper,
  Group,
  Title,
  Text,
  Divider,
  Badge,
} from "@mantine/core";

import TicketList from "../../../../common/components/TicketList/TicketList";
import TicketListSkeleton from "../../../../common/components/TicketList/TicketListSkeleton/TicketListSkeleton";

import { useGetAllTicketsQuery } from "../../../../store/tickets/ticketsApi";

const UserTicketList = () => {
  const { data: tickets, isLoading } = useGetAllTicketsQuery();

  return (
    <Container size="md">
      <Paper
        p="lg"
        radius="md"
        withBorder
        style={{ borderLeft: "4px solid var(--mantine-color-fixit-blue-6)" }}
      >
        <Group justify="space-between" mb="xs" align="center">
          <div>
            <Title order={3}>Twoje zgłoszenia</Title>
            <Text size="sm" c="dimmed">
              Lista zgłoszeń utworzonych przez Ciebie
            </Text>
          </div>
          {!isLoading && tickets && (
            <Badge color="fixit-blue" variant="light" size="lg">
              {tickets.length}
            </Badge>
          )}
        </Group>
        <Divider my="md" />
        {isLoading ? (
          <TicketListSkeleton />
        ) : (
          <TicketList tickets={tickets ?? []} />
        )}
      </Paper>
    </Container>
  );
};

export default UserTicketList;
