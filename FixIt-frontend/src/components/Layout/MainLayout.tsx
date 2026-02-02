import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppShell, Burger, Group, Text, NavLink, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { RootState } from "../../store/store";

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const menuConfig = {
    Admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Użytkownicy", path: "/admin/users" },
      { label: "Technicy", path: "/admin/technicians" },
      { label: "Wszystkie Zgłoszenia", path: "/admin/tickets" },
      { label: "Raporty", path: "/admin/reports" },
    ],
    Technician: [
      { label: "Dashboard", path: "/tech/dashboard" },
      { label: "Moje Zlecenia", path: "/tech/tickets" },
      { label: "Do pobrania", path: "/tech/available" },
    ],
    User: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Moje Zgłoszenia", path: "/tickets" },
    ],
  };

  const currentMenu = menuConfig[user?.role as keyof typeof menuConfig] || [];

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
          {currentMenu.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              onClick={() => navigate(item.path)}
            />
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
