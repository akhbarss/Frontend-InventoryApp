import { Card, Flex, ScrollArea, Table, Text } from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable
} from "@tanstack/react-table";
import cx from 'clsx';
import { useMemo, useState } from "react";
import classes from "./CustomTable.module.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type CustomTableFC<T> = {
    columns: ColumnDef<T, any>[]
    data: T[] | null
    loading: boolean,
    totalPage: number | null;
    totalRecords: number | null
    totalData: number | null
    useExportExcel?: boolean;
    useSearchFilter?: boolean
    useSearchInput?: boolean
    filterCell?: JSX.Element
    exportExcel?: JSX.Element;
    input?: {
        label: string
    }
}

const CustomTable = <T,>({
    columns,
    data = [],
    loading,
    totalPage,
    totalRecords,
    totalData,
    filterCell,
    input,
    useSearchInput,
    useSearchFilter,
    exportExcel,
    useExportExcel,
}: CustomTableFC<T>) => {
    const [scrolled, setScrolled] = useState(false);

    const finalData = useMemo(() => data, [data]), finalColumnDef = useMemo(() => columns, [columns])
    const table = useReactTable<T>({
        columns: finalColumnDef ?? [],
        data: finalData as T[],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        pageCount: totalPage as number,
    })

    return (
        <Card withBorder p={"md"} radius={"md"} shadow="md">
            <ScrollArea h={300} offsetScrollbars onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table miw={700} layout="fixed" highlightOnHover  >
                    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        {table?.getHeaderGroups() && table?.getHeaderGroups().map((headerElement) => (
                            <Table.Tr key={headerElement.id} >
                                {headerElement.headers.map(columnElement => (
                                    <Table.Th key={columnElement.id} w={columnElement.getSize()}>
                                        <Flex align={"center"} gap={10}>
                                            <div
                                                style={{
                                                    cursor: columnElement.column.getCanSort() ? "pointer" : "auto",
                                                    width: columnElement.getSize(),
                                                    display:"flex",
                                                    alignItems:"center"
                                                }}
                                                onClick={columnElement.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    columnElement.column.columnDef.header,
                                                    columnElement.getContext()
                                                )}
                                                {/* <span style={{ 
                                                    // display:"inline-flex",
                                                    // marginTop:"5px"
                                                 }}> */}
                                                    {{
                                                        asc: <IoMdArrowDropup size={20} />,
                                                        desc: <IoMdArrowDropdown size={20} />,
                                                    }[columnElement.column.getIsSorted() as string] ?? null}
                                                {/* </span> */}
                                            </div>
                                            {columnElement.column.getCanFilter() && filterCell ? filterCell : ""}
                                        </Flex>
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Thead>
                    <Table.Tbody>
                        {loading && loading ? (
                            <Table.Tr>
                                <Table.Td colSpan={table?.getAllLeafColumns().length}>
                                    <Text>Loading...</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : table?.getRowModel() && table?.getRowModel()?.rows.map(rowElement => (
                            <Table.Tr key={rowElement.id}>
                                {rowElement.getVisibleCells().map(cellElement => {
                                    return (
                                        <Table.Td key={cellElement.id}>
                                            {flexRender(
                                                cellElement.column.columnDef.cell,
                                                cellElement.getContext()
                                            )}
                                        </Table.Td>
                                    )
                                })}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Card>
    )
}

export default CustomTable