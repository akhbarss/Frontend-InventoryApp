import { Card, Group, Pagination, Select, Skeleton } from "@mantine/core";
import React from "react";

type PaginationProps = {
  loading?: boolean;
  totalPage: number;
  activePage?: number;
  totalData?: number;
  onPageChange?: (page: number) => void;
  onItemPerPageChange: (page: number) => void;
};

const Paginations = React.memo(({
  // loading = false,
  totalPage = 1,
  activePage = 1,
  onPageChange,
  onItemPerPageChange,
}: PaginationProps) => {
  console.log("pagination")
  return (
    <Card withBorder shadow="md" p={"xs"} component="section">
      <Group justify="space-between">
          <Pagination
            disabled={totalPage === 0}
            withEdges
            siblings={1}
            boundaries={1}
            value={activePage}
            onChange={onPageChange}
            total={totalPage === 0 ? 1 : totalPage}
          />

        <Select
          defaultValue={"50"}
          allowDeselect={false}
          onChange={(val) => onItemPerPageChange(+val!)}
          data={Array.from(new Set([1, 2, 5, 10, 20, 30, 40, 50])).map(
            (pageSize) => {
              return {
                value: pageSize.toString(),
                label: `Menampilkan ${pageSize} Data`,
              };
            }
          )}
        />
      </Group>
    </Card>
  );
});

export default Paginations;
