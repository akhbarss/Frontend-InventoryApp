import { createColumnHelper } from "@tanstack/react-table";

export const createColumnHelpers = <T,>() => {
    return createColumnHelper<T>()
}