import { PasswordInput, Select, TextInput } from "@mantine/core"
import { jurusan } from "../../../../../utils/constant"
import { useManajemenAdminFormContext } from "../../../../../utils/context/form-context"

export const FormManajemenAdmin = () => {
    const form = useManajemenAdminFormContext()

    return (
        <>
            <TextInput
                label="Nama"
                {...form.getInputProps("name")}
            />
            <Select
                label="Jurusan"
                data={jurusan}
                {...form.getInputProps("jurusan")}
            />
            <TextInput
                label="Username"
                {...form.getInputProps("username")}
            />
            <PasswordInput
                label="Password"
                {...form.getInputProps("password")}
            />
        </>
    )
}
