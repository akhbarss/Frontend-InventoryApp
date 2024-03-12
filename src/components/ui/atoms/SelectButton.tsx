import { Select } from "@mantine/core";

type SelectButtonProps<T> = {
  width?: number;
  label: string;
  data: T[];
  onChange: (selectedItem: T | null) => void;
};

const SelectButton = <T extends string | { label: string; value: string }>({
  data,
  width,
  label,
  onChange,
}: SelectButtonProps<T>) => {
  return (
    <Select
      width={10}
      checkIconPosition="right"
      style={{ width }}
      data={data.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item
      )}
      placeholder={label}
      onChange={(value) => {
        if (onChange) {
          onChange(value as T);
        }
      }}
    />
  );
};

export default SelectButton;
