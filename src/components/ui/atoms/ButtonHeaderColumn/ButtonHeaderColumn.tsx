import { Button, ButtonProps } from "@mantine/core"
import { Column } from "@tanstack/react-table";

interface ButtonHeaderColumnProps<T> extends ButtonProps {
    label: string;
    Icon: React.ReactNode;
    column: Column<T, any>
}

export const ButtonHeaderColumn = <T,>({ Icon, label, column, ...rest }: ButtonHeaderColumnProps<T>) => {
    return (
        <Button
        size="compact-sm"
            variant="subtle"
            rightSection={Icon}
            color="var(--mantine-color-text)"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            {...rest}
        >
            {label}
        </Button>
    )
}
