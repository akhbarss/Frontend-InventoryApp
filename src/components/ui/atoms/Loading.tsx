import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { LOGO_YATINDO } from "../../../assets/image/Logo_Yatindo_IMAGE";

const Loading = () => {
  return (
    <LoadingOverlay
      visible
      loaderProps={{
        children: (
          <Box
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <img src={LOGO_YATINDO} width={150} height={130} />
            <Loader />
          </Box>
        ),
      }}
    />
  );
};

export default Loading;
