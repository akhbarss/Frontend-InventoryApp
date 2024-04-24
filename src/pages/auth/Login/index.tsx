import * as Mantine from "@mantine/core";
import LogoYatindo from "../../../components/ui/atoms/LogoYatindo";
import PageLabel from "../../../components/ui/atoms/PageLabel";
import LoginForm from "../../../components/ui/moleculs/LoginForm";
import BG_YATINDO from ".././../../assets/bg-wp-content-login.png";
import classes from "./Login.module.css";

const LoginLeftSide = () => {
  return (
    <Mantine.Box className={classes["wp-school-left"]}>
      <LogoYatindo />
      <LoginForm />
      <Mantine.Text mt={20} ta={"center"} className={classes.copyright}>
        @Copyright 2024 D-Coders, All Rights Reserved.
      </Mantine.Text>
    </Mantine.Box>
  );
};

const LoginRightSide = () => {
  return (
    <Mantine.Box
      className={classes["right-side"]}
      style={{ backgroundImage: `url(${BG_YATINDO})` }}
    >
      <Mantine.Box className={classes["greetings"]}>
        <Mantine.Title fz={50}>Hello Again!</Mantine.Title>
        <Mantine.Title mt={10} fw={"normal"} order={3}>
          Bekasi, Indonesia
        </Mantine.Title>
      </Mantine.Box>
    </Mantine.Box>
  );
};

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
