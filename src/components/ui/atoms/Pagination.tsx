import { Card, Group, Pagination, Select, Skeleton } from "@mantine/core";

type PaginationProps = {
  loading?: boolean;
  totalPage?: number;
  activePage?: number;
  totalData?: number;
  onPageChange?: (page: number) => void;
  onItemPerPageChange: (page: number) => void;
};

const Paginations = ({
  loading = false,
  totalPage = 1,
  activePage = 1,
  onPageChange,
  onItemPerPageChange,
}: PaginationProps) => {
  return (
    <Card withBorder shadow="md" p={"xs"} component="section">
      <Group justify="space-between">
        <Skeleton visible={loading} w={"auto"}>
          <Pagination
          withEdges
            total={totalPage!}
            value={activePage}
            onChange={onPageChange}
          />
        </Skeleton>

        <Select
          defaultValue={"10"}
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
};

export default Paginations;

{
  /* <Group justify="end">
        <Text>1 &mdash; 5 of 100 items</Text>
        <Group gap={5}>
          <ActionIcon variant="default">
            <IoIosArrowBack />
          </ActionIcon>
          <ThemeIcon variant="default">1</ThemeIcon>
          <ActionIcon variant="default">
            <IoIosArrowForward />
          </ActionIcon>
        </Group>
        <Select
          // value={limit.toString()}
          allowDeselect={false}
          defaultValue={"10"}
          data={Array.from(new Set([5, 10, 20, 30, 40, 50])).map((pageSize) => {
            return {
              value: pageSize.toString(),
              label: `Menampilkan ${pageSize} Data`,
            };
          })}
        />
      </Group> */
}
