import * as Mantine from "@mantine/core";
import { isNotEmpty, matchesField, useForm } from "@mantine/form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../../../utils/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@utils/api/user";
import { showNotifications } from "@utils/showNotifications";
import { ResponseError } from "@utils/ResponseError";

interface ProfileProps {
  onClose: () => void;
  opened: boolean;
}

const Profile = ({ onClose, opened }: ProfileProps) => {
  const { user } = useAuth();
  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
  });
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: isNotEmpty(),
      confirmPassword: matchesField("password", "Password tidak sama"),
    },
  });

  const onUpdatePassword = (data: typeof form.values) => {
    const { password } = data;
    updatePasswordMutation.mutate(
      {
        password,
        userId: user.id!,
      },
      {
        onSuccess: () => {
          form.reset()
          showNotifications({
            title: "Success",
            type: "success",
          });
        },
        onError: (error: any) => ResponseError(error),
      }
    );
  };

  const closeNav = () => {
    onClose();
    form.reset();
  };

  return (
    <Mantine.Drawer
      title="Profile"
      opened={opened}
      withCloseButton={false}
      position="right"
      onClose={closeNav}
      styles={{
        title: { display: "none" },
        header: { padding: 0, minHeight: "20px" },
      }}
    >
      <Mantine.Avatar
        size={120}
        style={{
          marginInline: "auto",
        }}
      />
      <Mantine.Stack px={"xl"} gap={"xs"}>
        <Mantine.TextInput
          size="xs"
          readOnly
          label="Name"
          value={user?.name ?? ""}
        />
        <Mantine.TextInput
          size="xs"
          readOnly
          label="Username"
          value={user?.username ?? ""}
        />
        <Mantine.TextInput
          size="xs"
          readOnly
          label="Jurusan"
          value={user.role?.major ?? ""}
        />
        <Mantine.TextInput
          size="xs"
          readOnly
          label="Role"
          value={user?.role?.name ?? ""}
        />
        {user.role?.name == "SUPERADMIN" && (
          <form onSubmit={form.onSubmit(onUpdatePassword)}>
            <Mantine.PasswordInput
              mt={"xs"}
              size="xs"
              label="Password"
              {...form.getInputProps("password")}
            />
            <Mantine.PasswordInput
              size="xs"
              label="Confirm Password"
              {...form.getInputProps("confirmPassword")}
            />
            <Mantine.Flex justify={"end"} mt={"md"}>
              <Mantine.Button size="xs" color="red" type="submit">
                Ubah Password
              </Mantine.Button>
            </Mantine.Flex>
          </form>
        )}
        <Mantine.Button
          size="xs"
          variant="default"
          onClick={closeNav}
          leftSection={<IoIosArrowRoundBack size={30} />}
        >
          Kembali
        </Mantine.Button>
      </Mantine.Stack>
    </Mantine.Drawer>
  );
};

export default Profile;
