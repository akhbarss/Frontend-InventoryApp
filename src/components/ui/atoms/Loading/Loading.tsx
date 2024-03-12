import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { LOGO_YATINDO } from "../../../../assets/image/Logo_Yatindo_IMAGE";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <LoadingOverlay
      style={{ background: "black" }}
      visible
      loaderProps={{
        children: (
          <Box className={classes.loading}>
            <img src={LOGO_YATINDO} width={150} height={130} />
            <Loader />
          </Box>
        ),
      }}
    />
  );
};

export default Loading;
