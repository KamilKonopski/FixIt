import { Box, LoadingOverlay, Tabs } from "@mantine/core";

import DetailsTab from "./DetailsTab/DetailsTab";
import HistoryTab from "./HistoryTab/HistoryTab";
import NotesTab from "./NotesTab/NotesTab";

import { useGetTicketDetailsQuery } from "../../../../store/tickets/ticketsApi";

interface TicketDetailsModalProps {
  ticketId: string;
}

const TicketDetailsModal = ({ ticketId }: TicketDetailsModalProps) => {
  const { data: ticket, isLoading } = useGetTicketDetailsQuery(ticketId);

  if (!ticket && !isLoading) return null;

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: "md", blur: 2 }}
      />
      <Tabs
        defaultValue="details"
        color="var(--mantine-color-blue-4)"
        radius="lg"
        styles={{
          list: {
            gap: 12,
          },
        }}
      >
        <Tabs.List justify="center">
          <Tabs.Tab value="details">Szczegóły</Tabs.Tab>
          <Tabs.Tab value="notes">Notatki</Tabs.Tab>
          <Tabs.Tab value="history">Historia</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="details" pt="md">
          {ticket && <DetailsTab ticket={ticket} />}
        </Tabs.Panel>
        <Tabs.Panel value="notes" pt="md">
          <NotesTab />
        </Tabs.Panel>
        <Tabs.Panel value="history" pt="md">
          <HistoryTab history={ticket?.historyLogs} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default TicketDetailsModal;
