import { PageContent } from "@components/ui/atoms";
import PageLabel from "@components/ui/atoms/PageLabel";
import { Card, Grid, Skeleton, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { itemCount } from "@utils/api/items/index.api";
import { useAuth } from "@utils/hooks/useAuth";
import {
  BarChartHorizontalBig,
  ListTodo,
  PackageCheck,
  ScanLine,
  XCircle,
} from "lucide-react";
import classes from "./DashboardStore.module.css";

type CardStatisticProps = {
  color: string;
  label: string;
  amount: number;
  isLoading: boolean;
};

function CardStatistic({
  amount,
  color,
  label,
  isLoading,
}: CardStatisticProps) {
  return (
    <Skeleton visible={isLoading}>
      <Card className={classes.card_statistic} style={{ borderColor: color }}>
        <Text fz={24}>{label}</Text>
        <Text fz={30} fw={"bold"}>
          {amount}
        </Text>
      </Card>
    </Skeleton>
  );
}

const DashboardStore = () => {
  const { user } = useAuth();
  const major = user.role?.major;
  const { data, isLoading } = useQuery({
    queryKey: ["get_item_count", { major }],
    queryFn: () => itemCount(major!),
    enabled: major !== null,
  });

  const stats = [
    {
      label: "Total Barang",
      total: data?.payload.countItemByStatus.totalItemCount,
      Icon: BarChartHorizontalBig,
      // color: light ? "#97E0FF" : "#7db7d0",
      color: "#97E0FF",
    },
    {
      label: "Baik",
      total: data?.payload.countItemByStatus.goodItemCount,
      Icon: PackageCheck,
      // color: light ? "#B2FF97" : "#7ce058",
      color: "#B2FF97",
      prefix: "%",
    },
    {
      label: "Rusak Ringan",
      total: data?.payload.countItemByStatus.lightlyDamagedItemCount,
      Icon: ScanLine,
      // color: light ? "#FFE297" : "#d1b66d",
      color: "#FFE297",
      prefix: "%",
    },
    {
      label: "Rusak Parah",
      total: data?.payload.countItemByStatus.severelyDamagedItemCount,
      Icon: XCircle,
      color: "#FF97C3",
      prefix: "%",
    },
    {
      label: "Pengajuan",
      total: data?.payload.countItemByStatus.pendingRequestItemCount,
      Icon: ListTodo,
      color: "#8894FF",
      prefix: "",
    },
    {
      label: "Barang Keluar",
      total: data?.payload.countItemByStatus.outItemCount,
      Icon: ListTodo,
      color: "#8894FF",
      prefix: "",
    },
  ];

  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Text fz={24}>Status Barang</Text>
        <Grid gutter={{ base: 10, sm: 20 }}>
          {stats.map(({ color, label, total }, i) => (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={i}>
              <CardStatistic
                color={color}
                label={label}
                amount={total!}
                isLoading={isLoading}
              />
            </Grid.Col>
          ))}
        </Grid>
      </PageContent>
    </>
  );
};

export default DashboardStore;
