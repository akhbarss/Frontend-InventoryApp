import { Carousel } from "@mantine/carousel";
import * as Mantine from "@mantine/core";
import LogoYatindo from "../../../components/ui/atoms/LogoYatindo";
import PageLabel from "../../../components/ui/atoms/PageLabel";
import LoginForm from "../../../components/ui/moleculs/LoginForm";
import BG_YATINDO from ".././../../assets/bg-wp-content-login.png";
import classes from "./Login.module.css";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const images = [
  BG_YATINDO,
  "https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg",
];

const LoginLeftSide = () => {
  return (
    <Mantine.Box className={classes["wp-school-left"]} style={{ flex: 1 }}>
      <LogoYatindo />
      <LoginForm />
      <Mantine.Text mt={20} ta={"center"} className={classes.copyright}>
        @Copyright 2024 D-Coders, All Rights Reserved.
      </Mantine.Text>
    </Mantine.Box>
  );
};

const LoginRightSide = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <Mantine.Box className={classes["login-right-side"]}>
      <Carousel
        withIndicators
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {images.map((url) => (
          <Carousel.Slide key={url}>
            <Mantine.Box
              className={classes["right-side"]}
              style={{ backgroundImage: `url(${url})` }}
            >
              <Mantine.Box className={classes["greetings"]}>
                <Mantine.Title fz={50}>Hello Again!</Mantine.Title>
                <Mantine.Title mt={10} fw={"normal"} order={3}>
                  Bekasi, Indonesia
                </Mantine.Title>
              </Mantine.Box>
            </Mantine.Box>
          </Carousel.Slide>
        ))}
      </Carousel>
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
