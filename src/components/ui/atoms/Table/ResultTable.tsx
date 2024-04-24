import { Box, Skeleton, Table } from "@mantine/core";

type ResultTableProps = {
  data: { label: string; value: any }[];
  isLoading?: boolean;
};

const ResultTable = ({ data, isLoading = false }: ResultTableProps) => {
  return (
    <Box fw={"bold"}>
      <Table withRowBorders={false}>
        <Table.Tbody>
          {data.map((data, i) => {
            return (
              <Table.Tr key={i}>
                <Table.Td style={{ verticalAlign: "top" }}>{data?.label}</Table.Td>
                <Table.Td style={{ verticalAlign: "top" }}>:</Table.Td>
                <Table.Td>
                  <Skeleton visible={isLoading}>{data?.value}</Skeleton>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ResultTable;
