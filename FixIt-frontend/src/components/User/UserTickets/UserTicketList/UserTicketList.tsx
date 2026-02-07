import { useState } from "react";
import {
  Container,
  Paper,
  Group,
  Title,
  Text,
  Divider,
  Badge,
  Button,
  Flex,
  Stack,
} from "@mantine/core";

import CreateUserTicketModal from "../CreateUserTicketModal/CreateUserTicketModal";
import Modal from "../../../../common/components/Modal/Modal";
import TicketList from "../../../../common/components/TicketList/TicketList";
import TicketListSkeleton from "../../../../common/components/TicketList/TicketListSkeleton/TicketListSkeleton";

import { useGetAllTicketsQuery } from "../../../../store/tickets/ticketsApi";

const UserTicketList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: tickets, isLoading } = useGetAllTicketsQuery();

  return (
    <>
      <Container size={900}>
        <Flex direction="column" gap="sm">
          <Flex justify="flex-end">
            <Button onClick={() => setIsOpen(true)}>Dodaj zgłoszenie</Button>
          </Flex>
          <Paper
            p="lg"
            radius="md"
            withBorder
            style={{
              borderLeft: "4px solid var(--mantine-color-fixit-blue-6)",
            }}
          >
            <Group justify="space-between" mb="xs" align="center">
              <Stack gap={0}>
                <Title order={3}>Twoje zgłoszenia</Title>
                <Text size="sm" c="dimmed">
                  Lista zgłoszeń utworzonych przez Ciebie
                </Text>
              </Stack>
              {!isLoading && tickets && (
                <Badge color="fixit-blue" variant="light" size="lg">
                  {tickets.length}
                </Badge>
              )}
            </Group>
            <Divider my="md" />
            {/* Filters here */}
            {/* <Divider my="md" /> */}
            {isLoading ? (
              <TicketListSkeleton />
            ) : (
              <TicketList tickets={tickets ?? []} />
            )}
          </Paper>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateUserTicketModal onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default UserTicketList;
