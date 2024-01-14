import * as Mantine from "@mantine/core"
import LoginLeftSide from "../../components/moleculs/LoginLeftSide"
import LoginRightSide from "../../components/moleculs/LoginRightSide"

const Login = () => {
  return (
    <Mantine.Box >
      <Mantine.Flex mih={"100vh"}>
        <LoginLeftSide />
        <LoginRightSide />
      </Mantine.Flex>
    </Mantine.Box>
  )
}

export default Login