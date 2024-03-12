import { Box, Card, Divider, Text, Title } from "@mantine/core";
import { LucideIcon } from "lucide-react";
import classes from "./CardClass.module.css";

interface CardClassProps {
  title: string;
  total: number;
  Icon: LucideIcon;
  color: string;
  image?: string;
}

export const CardClass = ({
  title,
  total,
  Icon,
  color,
  image,
}: CardClassProps) => {
  return (
    <Card className={classes.card} shadow="lg" withBorder>
      <Box className={classes.icon_class} bg={color}>
        {image ? (
          <img src={image} width={100} height={100} />
        ) : (
          <Icon size={50} />
        )}
      </Box>
      <Box className={classes.description}>
        <Title order={2}>{title}</Title>
        <Divider my={"xs"} />
        <Text fz={"sm"} fw={"bold"}>
          Total Keseluruhan Barang
        </Text>
        <Title mt={"xs"} order={2}>{total}</Title>
      </Box>
    </Card>
  );
};
