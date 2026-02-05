import { Card, Skeleton, Stack, Group } from "@mantine/core";

interface TicketListSkeletonProps {
  items?: number;
}

const TicketListSkeleton = ({ items = 5 }: TicketListSkeletonProps) => {
  return (
    <Stack gap="sm">
      {Array.from({ length: items }).map((_, index) => (
        <Card key={index} p="md" withBorder>
          <Stack gap="sm">
            <Group gap="sm">
              <Skeleton animate height={16} width="40%" radius="sm" />
              <Skeleton animate height={16} width={90} radius="xl" />
            </Group>
            <Skeleton animate height={12} width="95%" />
            <Skeleton animate height={12} width="75%" />
            <Group gap="lg" mt={4}>
              <Skeleton animate height={10} width={80} />
              <Skeleton animate height={10} width={160} />
            </Group>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default TicketListSkeleton;
