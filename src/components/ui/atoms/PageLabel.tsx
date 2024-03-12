import { useDocumentTitle } from "@mantine/hooks";
import React, { useEffect } from "react";
import { setLabel } from "../../../store/features/page-label.slice";
import { useAppDispatch } from "../../../store/store";

interface TPageLabel {
    label: string;
}

const PageLabel = ({ label }: TPageLabel) => {
    const dispatch = useAppDispatch()
    useDocumentTitle(`${label} | Inventory App`)
    useEffect(() => {
        dispatch(setLabel(label))
    }, [])
    return <React.Fragment />
}

export default PageLabel