import { Center, Pagination } from "@mantine/core";

interface TicketPaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const TicketPagination = ({ page, total, onChange }: TicketPaginationProps) => {
  if (total <= 1) return null;

  return (
    <Center>
      <Pagination value={page} total={total} onChange={onChange} withEdges />
    </Center>
  );
};

export default TicketPagination;
