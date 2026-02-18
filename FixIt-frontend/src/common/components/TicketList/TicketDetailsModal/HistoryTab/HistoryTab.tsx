import { Stack, Group, Text, Card, Box } from "@mantine/core";

import InitialsAvatar from "../../../InitialsAvatar/InitialsAvatar";

import type { HistoryLog } from "../../../../types/tickets";

interface HistoryTabProps {
  history: HistoryLog[];
}

const HistoryTab = ({ history }: HistoryTabProps) => {
  return (
    <Box pl="lg" style={{ borderLeft: "2px solid #2C2E33" }}>
      <Stack gap="xl">
        {history?.map((log) => (
          <Group key={log.id} align="flex-start" gap="md">
            <InitialsAvatar fullName={log.userFullName} />
            <Card radius="md" p="md" style={{ flex: 1 }}>
              <Stack gap={4}>
                <Group justify="space-between">
                  <Text fw={600}>{log.userFullName}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(log.createdAt).toLocaleString()}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {log.description}
                </Text>
              </Stack>
            </Card>
          </Group>
        ))}
      </Stack>
    </Box>
  );
};

export default HistoryTab;
