import { Grid } from "@mantine/core";
import { Cable, CircleDollarSign, Cpu, Wrench } from "lucide-react";
import { LOGO_TKJ } from "../../../../assets/image/LOGO_TKJ";
import { PageContent } from "../../../../components/ui/atoms";
import { CardClass } from "../../../../components/ui/atoms/CardClass/CardClass";
import PageLabel from "../../../../components/ui/atoms/PageLabel";

const DashboardSuperAdmin = () => {
  const stats = [
    {
      label: "TJKT",
      total: 100,
      Icon: Cpu,
      color: "#97E0FF",
      image: LOGO_TKJ,
    },
    {
      label: "AKL",
      total: 100,
      Icon: CircleDollarSign,
      color: "#FF97C3",
      image: LOGO_TKJ,
    },
    {
      label: "TE",
      total: 100,
      Icon: Cable,
      color: "#B2FF97",
      image: LOGO_TKJ,
    },
    {
      label: "TO",
      total: 100,
      Icon: Wrench,
      color: "#FFE297",
      image: LOGO_TKJ,
    },
  ];

  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Grid
          gutter={50}
          styles={{
            inner: {
              justifyContent: "center",
            },
          }}
        >
          {stats.map(({ label, total, Icon, color, image }) => (
            <Grid.Col key={label} span={5}>
              <CardClass
                title={label}
                total={total}
                Icon={Icon}
                color={color}
                image={image ? image : ""}
              />
            </Grid.Col>
          ))}
        </Grid>
      </PageContent>
    </>
  );
};

export default DashboardSuperAdmin;
