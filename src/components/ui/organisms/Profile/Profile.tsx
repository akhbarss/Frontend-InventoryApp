import * as Mantine from "@mantine/core";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../../../utils/hooks/useAuth";

interface ProfileProps {
  onClose: () => void;
  opened: boolean;
}

const Profile = ({ onClose, opened }: ProfileProps) => {
  const { user } = useAuth();

  return (
    <Mantine.Drawer
      title="Profile"
      opened={opened}
      withCloseButton={false}
      position="right"
      onClose={onClose}
      styles={{ title: { display: "none" } }}
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
        <Mantine.TextInput size="xs" readOnly label="Jurusan" value={"TKJ"} />
        <Mantine.TextInput
          size="xs"
          readOnly
          label="Role"
          value={user?.role?.name ?? ""}
        />

        <Mantine.PasswordInput mt={"xs"} size="xs" label="Password" />
        <Mantine.PasswordInput size="xs" label="Confirm Password" />

        <Mantine.Flex justify={"end"}>
          <Mantine.Button size="xs" color="red">
            Ubah Password
          </Mantine.Button>
        </Mantine.Flex>
        <Mantine.Button
          size="xs"
          variant="default"
          onClick={() => onClose()}
          leftSection={<IoIosArrowRoundBack size={30} />}
        >
          Kembali
        </Mantine.Button>
      </Mantine.Stack>
    </Mantine.Drawer>
  );
};

export default Profile;
