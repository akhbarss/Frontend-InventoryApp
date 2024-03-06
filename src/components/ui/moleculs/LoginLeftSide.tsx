import * as Mantine from "@mantine/core";
import classes from "../../../pages/auth/Login.module.css";
import LogoYatindo from "../atoms/LogoYatindo";
import LoginForm from "./LoginForm";

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

export default LoginLeftSide;
