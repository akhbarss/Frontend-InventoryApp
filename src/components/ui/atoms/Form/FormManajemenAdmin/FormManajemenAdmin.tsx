import { ComboboxData, PasswordInput, Select, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getAllRole } from "@utils/api/role/index.api";
import { useManajemenAdminFormContext } from "../../../../../utils/context/form-context";

export const FormManajemenAdmin = () => {
  const form = useManajemenAdminFormContext();
  const { data } = useQuery({
    queryKey: ["get_all_role"],
    queryFn: getAllRole,
  });

  console.log({ data });

  const dataRole: ComboboxData = data?.payload.findAllRoles.map((role) => ({
    value: role.id + "",
    label: role.major,
  }))!;

  return (
    <>
      <TextInput label="Nama" {...form.getInputProps("name")} />
      <Select
        label="Jurusan"
        minLength={5}
        data={dataRole}
        {...form.getInputProps("jurusan")}
      />
      <TextInput
        label="Username"
        minLength={5}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        minLength={8}
        {...form.getInputProps("password")}
        autoComplete="new-password"
      />
    </>
  );
};
