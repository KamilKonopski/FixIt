import { AppShell, Burger, Group, Text, NavLink, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text
            fw={900}
            size="xl"
            lts={-1}
            variant="gradient"
            gradient={{ from: "blue.5", to: "cyan.3" }}
          >
            FIXIT
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink label="Dashboard" active variant="filled" />
          <NavLink label="Zgłoszenia" />
          <NavLink label="Użytkownicy" />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Text c="dimmed" size="sm">
          Witaj w panelu FixIt! Tutaj będą pojawiać się zgłoszenia.
        </Text>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
