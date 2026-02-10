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
import TicketFilters from "../../../../common/components/TicketList/TicketFilters/TicketFilters";
import TicketList from "../../../../common/components/TicketList/TicketList";
import TicketListSkeleton from "../../../../common/components/TicketList/TicketListSkeleton/TicketListSkeleton";
import TicketPagination from "../../../../common/components/TicketList/TicketPagination/TicketPagination";

import { useGetAllTicketsQuery } from "../../../../store/tickets/ticketsApi";

import { useDebounce } from "../../../../common/hooks/useDebounce";
import type {
  SortOption,
  TicketStatus,
} from "../../../../common/types/tickets";

const UserTicketList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TicketStatus | undefined>();
  const [sort, setSort] = useState<SortOption>("Desc");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const params = {
    page,
    pageSize: 4,
    search: debouncedSearch || undefined,
    sort,
    ...(status && { status }),
  };

  const { data, isLoading } = useGetAllTicketsQuery(params);

  const tickets = data?.result ?? [];
  const totalPages = data ? Math.ceil(data.totalCount / data.pageSize) : 0;

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
                  {data?.totalCount ?? 0}
                </Badge>
              )}
            </Group>
            <Divider my="md" />
            <TicketFilters
              search={search}
              status={status}
              sort={sort}
              onSearchChange={(value) => {
                setPage(1);
                setSearch(value);
              }}
              onStatusChange={(value) => {
                setPage(1);
                setStatus(value);
              }}
              onSortChange={(value) => {
                setPage(1);
                setSort(value);
              }}
            />
            <Divider my="md" />
            {isLoading ? (
              <TicketListSkeleton />
            ) : (
              <TicketList tickets={tickets} />
            )}
            <Divider my="md" />
            <TicketPagination
              page={page}
              total={totalPages}
              onChange={setPage}
            />
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
