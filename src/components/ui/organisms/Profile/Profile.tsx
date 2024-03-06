import * as Mantine from "@mantine/core";
import { IoIosArrowRoundBack } from "react-icons/io";

interface ProfileProps {
  onClose: () => void;
  opened: boolean;
}

const Profile = ({ onClose, opened }: ProfileProps) => {
  return (
    <Mantine.Drawer
      title="Profile"
      opened={opened}
      position="right"
      onClose={onClose}
      styles={{
        title: { display: "none" },
      }}
    >
      <Mantine.Avatar
        size={130}
        style={{
          marginInline: "auto",
        }}
      />
      <Mantine.Stack px={"xl"} gap={"sm"}>
        <Mantine.TextInput
          size="sm"
          readOnly
          label="Username"
          value={"akhbarss"}
        />
        <Mantine.TextInput size="sm" readOnly label="Jurusan" value={"TKJ"} />
        <Mantine.TextInput size="sm" readOnly label="Role" value={"Admin"} />

        <Mantine.PasswordInput mt={20} size="sm" label="Password" />
        <Mantine.PasswordInput size="sm" label="Confirm Password" />

        <Mantine.Flex justify={"end"}>
          <Mantine.Button size="sm" color="red">
            Ubah Password
          </Mantine.Button>
        </Mantine.Flex>
        <Mantine.Button
          size="sm"
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
