import { Box, Text } from "@mantine/core";

interface InfoItemProps {
  label: string;
  value?: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <Box>
    <Text size="xs" c="dimmed" mb={4}>
      {label}
    </Text>
    <Text size="sm" fw={500}>
      {value || "---"}
    </Text>
  </Box>
);

export default InfoItem;
