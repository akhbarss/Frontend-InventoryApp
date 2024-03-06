import * as Mantine from "@mantine/core";
import PageLabel from "../../components/ui/atoms/PageLabel";
import LoginLeftSide from "../../components/ui/moleculs/LoginLeftSide";
import LoginRightSide from "../../components/ui/moleculs/LoginRightSide";

const Login = () => {
  return (
    <Mantine.Box>
      <PageLabel label="Login" />

      <Mantine.Flex mih={"100vh"}>
        <LoginLeftSide />
        <LoginRightSide />
      </Mantine.Flex>
    </Mantine.Box>
  );
};

export default Login;
