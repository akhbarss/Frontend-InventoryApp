import { Grid } from "@mantine/core";
import { Cable, CircleDollarSign, Cpu, Wrench } from "lucide-react";
import { CardClass } from "../../../components/ui/atoms/CardClass/CardClass";
import { PageContent } from "../../../components/ui/atoms/PageContent";
import PageLabel from "../../../components/ui/atoms/PageLabel";

const DashboardSuperAdmin = () => {
  const stats = [
    {
      label: "TJKT",
      total: 100,
      Icon: Cpu,
      color: "#97E0FF",
    },
    {
      label: "AKL",
      total: 100,
      Icon: CircleDollarSign,
      color: "#FF97C3",
    },
    {
      label: "TE",
      total: 100,
      Icon: Cable,
      color: "#B2FF97",
    },
    {
      label: "TO",
      total: 100,
      Icon: Wrench,
      color: "#FFE297",
    },
  ];

  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Grid>
          {stats.map(({ label, total, Icon, color }) => (
            <Grid.Col key={label} span={6}>
              <CardClass
                title={label}
                total={total}
                Icon={Icon}
                color={color}
              />
            </Grid.Col>
          ))}
        </Grid>
      </PageContent>
    </>
  );
};

export default DashboardSuperAdmin;
