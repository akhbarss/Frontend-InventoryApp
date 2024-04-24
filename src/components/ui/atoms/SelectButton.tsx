import { ComboboxItem, Select } from "@mantine/core";

type DataSelect<T> = {
  label: string;
  value: T;
};

type SelectButtonProps<T> = {
  value: T;
  data: DataSelect<T>[];
  label?: string;
  width?: number;
  onChange: (selectedItem: ComboboxItem) => void;
};

const SelectButton = <T extends string >({
  data,
  width,
  label,
  value,
  onChange,
}: SelectButtonProps<T>) => {
  return (
    <Select
      clearable
      width={10}
      checkIconPosition="right"
      style={{ width }}
      data={data.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item
      )}
      value={value}
      placeholder={label}
      onChange={(_, obj) => {
        if (onChange) {
          onChange(obj);
        }
      }}
    />
  );
};

export default SelectButton;
