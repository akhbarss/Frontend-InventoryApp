import { PageContent } from "@components/ui/atoms";
import { CardClass } from "@components/ui/atoms/CardClass/CardClass";
import PageLabel from "@components/ui/atoms/PageLabel";
import { Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getItemMajorCount } from "@utils/api/items/index.api";
import { Cable, CircleDollarSign, Cpu, Wrench } from "lucide-react";
import {
  LOGO_TKJ,
  LOGO_AKL,
  LOGO_TE,
  LOGO_TKR,
} from "../../../../assets/image/LOGO_TKJ";

const Dashboard_SuperAdmin = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get_major_item_count"],
    queryFn: getItemMajorCount,
  });
  const datas = data?.payload.countItemByMajor;
  const stats = [
    {
      label: "TJKT",
      total: datas?.TJKT,
      Icon: Cpu,
      color: "#97E0FF",
      image: LOGO_TKJ,
    },
    {
      label: "AK",
      total: datas?.AK,
      Icon: CircleDollarSign,
      color: "#FF97C3",
      image: LOGO_AKL,
    },
    {
      label: "TE",
      total: datas?.TE,
      Icon: Cable,
      color: "#B2FF97",
      image: LOGO_TE,
    },
    {
      label: "TO",
      total: datas?.TO,
      Icon: Wrench,
      color: "#FFE297",
      image: LOGO_TKR,
    },
  ];

  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Grid
          gutter={{ base: 20 }}
          styles={{
            inner: {
              justifyContent: "center",
            },
          }}
        >
          {stats.map(({ label, total, Icon, color, image }) => (
            <Grid.Col key={label} span={{ base: 12, md: 6 }}>
              <CardClass
                Icon={Icon}
                title={label}
                total={total!}
                color={color}
                isLoading={isLoading}
                image={image ? image : ""}
              />
            </Grid.Col>
          ))}
        </Grid>
      </PageContent>
    </>
  );
};

export default Dashboard_SuperAdmin;
