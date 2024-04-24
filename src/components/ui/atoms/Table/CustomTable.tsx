import { Card, Flex, ScrollArea, Skeleton, Table } from "@mantine/core";
import type { ColumnDef, Table as TableProps } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cx from "clsx";
import React, { useMemo, useState } from "react";
import classes from "./CustomTable.module.css";

type CustomTableFC<T> = {
  columns: ColumnDef<T, any>[];
  data: T[] | null;
  loading: boolean;
  totalPage: number | null;
  totalRecords?: number | null;
  totalData?: number | null;
  useExportExcel?: boolean;
  useSearchFilter?: boolean;
  useSearchInput?: boolean;
  filterCell?: JSX.Element;
  exportExcel?: JSX.Element;
  input?: {
    label: string;
  };
};
type HeadTableProps<T> = {
  table: TableProps<T>;
  scrolled: boolean;
  filterCell?: JSX.Element;
};

type BodyTableProps<T> = {
  loading: boolean;
  table: TableProps<T>;
};

const CustomTable = <T extends unknown>({
  columns,
  data = [],
  loading,
  totalPage,
  filterCell,
}: CustomTableFC<T>) => {
  console.log("table");
  const [scrolled, setScrolled] = useState(false);
  const finalData = useMemo(() => data, [data]);
  const finalColumnDef = useMemo(() => columns, [columns]);

  const table = useReactTable<T>({
    data: finalData as T[],
    columns: finalColumnDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: totalPage as number,
  });

  return (
    <Skeleton visible={loading}>
      <Card
        withBorder
        p={"md"}
        shadow="md"
        radius={"md"}
        component="section"
        className={classes.card_table}
      >
        <ScrollArea
          h={300}
          offsetScrollbars={true}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          styles={{ viewport: { padding: 0 }, thumb: { zIndex: 100 } }}
        >
          <Table miw={700} layout="fixed" highlightOnHover striped>
            <MemoizedHeadTable
              scrolled={scrolled}
              table={table}
              filterCell={filterCell}
            />
            <BodyTable loading={loading} table={table} />
          </Table>
        </ScrollArea>
      </Card>
    </Skeleton>
  );
};

const HeadTable = <T,>({ scrolled, table, filterCell }: HeadTableProps<T>) => {
  console.log("HeadTable");
  return (
    <Table.Thead
      className={cx(classes.header, { [classes.scrolled]: scrolled })}
    >
      {table?.getHeaderGroups() &&
        table?.getHeaderGroups().map((headerElement) => (
          <Table.Tr key={headerElement.id}>
            {headerElement.headers.map((columnElement) => {
              if (columnElement.id == "manual_id") {
                return (
                  <Table.Th
                    key={columnElement.id}
                    w={columnElement.getSize()}
                    className={
                      columnElement.column.getCanPin()
                        ? classes.column_pinned_left_head
                        : undefined
                    }
                  >
                    <Flex align={"center"} gap={10}>
                      <div
                        style={{
                          width: columnElement.getSize(),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {flexRender(
                          columnElement.column.columnDef.header,
                          columnElement.getContext()
                        )}
                      </div>
                      {columnElement.column.getCanFilter() && filterCell
                        ? filterCell
                        : ""}
                    </Flex>
                  </Table.Th>
                );
              } else
                return (
                  <Table.Th
                    key={columnElement.id}
                    w={columnElement.getSize()}
                    className={
                      columnElement.column.getCanPin()
                        ? classes.column_pinned
                        : undefined
                    }
                  >
                    <Flex align={"center"} gap={10}>
                      <div
                        style={{
                          width: columnElement.getSize(),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {flexRender(
                          columnElement.column.columnDef.header,
                          columnElement.getContext()
                        )}
                      </div>
                      {columnElement.column.getCanFilter() && filterCell
                        ? filterCell
                        : ""}
                    </Flex>
                  </Table.Th>
                );
            })}
          </Table.Tr>
        ))}
    </Table.Thead>
  );
};

const BodyTable = <T,>({ loading, table }: BodyTableProps<T>) => {
  console.log("BodyTable");
  return (
    <Table.Tbody>
      {loading && loading ? (
        <Table.Tr>
          <Table.Td colSpan={table?.getAllLeafColumns().length}></Table.Td>
        </Table.Tr>
      ) : (
        table?.getRowModel() &&
        table?.getRowModel()?.rows.map((rowElement) => (
          <Table.Tr key={rowElement.id}>
            {rowElement.getVisibleCells().map((cellElement) => {
              if (cellElement.id.includes("manual_id")) {
                return (
                  <Table.Td
                    key={cellElement.id}
                    className={
                      cellElement.column.getCanPin()
                        ? classes.column_pinned_left_body
                        : undefined
                    }
                  >
                    {flexRender(
                      cellElement.column.columnDef.cell,
                      cellElement.getContext()
                    )}
                  </Table.Td>
                );
              } else {
                return (
                  <Table.Td
                    key={cellElement.id}
                    className={
                      cellElement.column.getCanPin()
                        ? classes.column_pinned
                        : undefined
                    }
                  >
                    {flexRender(
                      cellElement.column.columnDef.cell,
                      cellElement.getContext()
                    )}
                  </Table.Td>
                );
              }
            })}
          </Table.Tr>
        ))
      )}
    </Table.Tbody>
  );
};
const MemoizedHeadTable = React.memo(HeadTable) as typeof HeadTable;
const MemoizedBodyTable = React.memo(BodyTable) as typeof BodyTable;

// const CustomTable = React.memo(CustomTables) as typeof CustomTables;
export default CustomTable;
