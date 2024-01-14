import { Box, Card, Divider, Text, Title } from "@mantine/core";
import { LucideIcon } from "lucide-react";
import classes from "./CardClass.module.css";

interface CardClassProps {
    title: string;
    total: number;
    Icon: LucideIcon;
    color: string;
}

export const CardClass = ({
title,
total,
Icon,
color
}: CardClassProps) => {
    return (
        <Card className={classes.card} shadow="lg" withBorder>
            <Box className={classes.icon_class} bg={color}>
                <Icon size={50} />
            </Box>
            <Box className={classes.description}>
                <Title order={2}>
                    {title}
                </Title>
                <Divider  />
                <Text fz={"sm"} fw={"bold"}>Total Keseluruhan Barang</Text>
                <Title order={2}>{total}</Title>
            </Box>
        </Card>
    )
}
