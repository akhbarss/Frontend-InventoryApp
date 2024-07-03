import * as Mantine from "@mantine/core";
import { LOGO_YATINDO } from "../../../assets/image/Logo_Yatindo_IMAGE";
import classes from "./LogoYatindo.module.css";

const LogoYatindo = () => {
  return (
    <Mantine.Flex gap={20} align={"center"} justify={"center"}>
      <Mantine.Image src={LOGO_YATINDO} className={classes["logo-yatindo"]} />
      <Mantine.Divider
        size={"sm"}
        orientation="vertical"
        className={classes["divider-vertical"]}
      />
      <Mantine.Box>
        <Mantine.Text className={classes["title-app"]}>
          Inventaris
          <br />
          Barang
          <br />
          Sekolah
        </Mantine.Text>
      </Mantine.Box>
    </Mantine.Flex>
  );
};

export default LogoYatindo;
