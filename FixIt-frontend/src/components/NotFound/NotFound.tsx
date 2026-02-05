import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Button, Group, Stack } from "@mantine/core";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      size="sm"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack align="center" gap="md" w="100%">
        <Title
          order={1}
          c="fixit-blue.5"
          style={{ fontSize: 96, lineHeight: 1 }}
        >
          404
        </Title>

        <Title order={3} ta="center">
          Strona nie została znaleziona
        </Title>

        <Text c="dimmed" ta="center">
          Podany adres nie istnieje lub strona została przeniesiona. Sprawdź
          adres URL albo wróć do strony głównej.
        </Text>

        <Group mt="md">
          <Button color="fixit-blue" onClick={() => navigate("/")}>
            Strona główna
          </Button>

          <Button
            variant="light"
            color="fixit-blue"
            onClick={() => navigate(-1)}
          >
            Wróć
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default NotFound;
