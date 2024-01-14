import { Box, Card, SimpleGrid, Text } from "@mantine/core"

const stats = [
    {
        label: "TKJ",
        total: 100
    },
    {
        label: "TKJ",
        total: 100
    },
    {
        label: "TKJ",
        total: 100
    },
    {
        label: "TKJ",
        total: 100
    },
    {
        label: "TKJ",
        total: 100
    },
]


const StatisticCard = () => {
    return (
        <SimpleGrid
            cols={{ base: 1, xs: 3, lg: 5, }}
        >
            {stats.map(stat => {
                return (
                    <Card
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            boxShadow: "0 4px 4px 0 rgba(0,0,0, 0.25)",
                            borderRadius: "5px"
                        }}
                        p={"xs"}
                    >

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "4rem",
                                borderRadius: "5px",
                                background: "#454D90"
                            }}
                        >
                            <Text
                                style={{
                                    textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                                }}
                                c={"white"} fw={"bold"} fz={30}>{stat.label}</Text>
                        </Box>
                        <Text mt={5} fw={"normal"} c={"#7f7f7f"}>Total Barang</Text>
                        <Text fz={28} fw={"bold"} >{stat.total}</Text>
                    </Card>
                )
            })}
        </SimpleGrid>
    )
}

export default StatisticCard