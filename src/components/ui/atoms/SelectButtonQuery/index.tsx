import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";

type SelectButtonQueryProps = {
  data?: any[];
  dataLabel?: { label: string; value: string }[];
  queryName: string;
  placeholder: string;
  width?: string;
};

export function SelectButtonQuery({
  data = [],
  dataLabel = [],
  queryName,
  placeholder,
  width,
}: SelectButtonQueryProps) {
  const [queryValue, setQueryValue] = useQueryParam(queryName, StringParam);

  const [queryValueSelected, setQueryValueSelected] = useState(
    queryValue || ""
  );

  useEffect(() => {
    if (queryValueSelected) {
      setQueryValue(queryValueSelected);
    } else if (queryValueSelected == null) {
      setQueryValue("");
    }
  }, [queryValueSelected]);
  return (
    <Select
      w={width}
      clearable
      data={dataLabel?.length > 0 ? dataLabel : data}
      value={queryValueSelected}
      placeholder={placeholder}
      checkIconPosition="right"
      onChange={(_, obj) => {
        if (obj?.value) {
          setQueryValueSelected(obj.value);
        } else {
          setQueryValueSelected(null!);
        }
      }}
    />
  );
}
