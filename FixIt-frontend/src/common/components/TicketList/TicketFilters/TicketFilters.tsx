import { Group, Select, TextInput } from "@mantine/core";

import type { TicketStatus, SortOption } from "../../../types/tickets";

interface TicketFiltersProps {
  search: string;
  status?: TicketStatus;
  sort: SortOption;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: TicketStatus) => void;
  onSortChange: (value: SortOption) => void;
}

const statusOptions = [
  { value: "New", label: "Nowe" },
  { value: "Assigned", label: "Przypisane" },
  { value: "InProgress", label: "W trakcie" },
  { value: "Resolved", label: "Rozwiązane" },
  { value: "Closed", label: "Zamknięte" },
];

const sortOptions = [
  { value: "Desc", label: "Najnowsze" },
  { value: "Asc", label: "Najstarsze" },
];

const TicketFilters = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: TicketFiltersProps) => {
  return (
    <Group grow>
      <TextInput
        placeholder="Szukaj zgłoszenia..."
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
      <Select
        clearable
        placeholder="Wszystkie"
        data={statusOptions}
        value={status ?? null}
        onChange={(value) =>
          onStatusChange(value ? (value as TicketStatus) : undefined)
        }
      />
      <Select
        placeholder="Sortowanie"
        data={sortOptions}
        value={sort}
        onChange={(value) => {
          if (value) {
            onSortChange(value as SortOption);
          }
        }}
      />
    </Group>
  );
};

export default TicketFilters;
