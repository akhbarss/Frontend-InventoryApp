import { PasswordInput, Select, TextInput } from "@mantine/core";
import { jurusan } from "../../../../../utils/constant";
import { useManajemenAdminFormContext } from "../../../../../utils/context/form-context";

export const FormManajemenAdmin = () => {
  const form = useManajemenAdminFormContext();

  return (
    <>
      <TextInput label="Nama" {...form.getInputProps("name")} />
      <Select
        label="Jurusan"
        minLength={5}
        data={jurusan}
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
