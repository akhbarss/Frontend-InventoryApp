import { Card, Divider, Grid, Text, useComputedColorScheme } from "@mantine/core";
import {
  BarChartHorizontalBig,
  ListTodo,
  PackageCheck,
  ScanLine,
  XCircle,
} from "lucide-react";
import { PageContent } from "../../../components/ui/atoms/PageContent";
import PageLabel from "../../../components/ui/atoms/PageLabel";
import CustomTable from "../../../components/ui/atoms/Table/CustomTable";
import {
  TColDashboardAdmin,
  columnsDashboardAdmin,
} from "../../../utils/columns/dashhboard-admin";
import classes from "./DashboardAdmin.module.css";

type CardStatisticProps = {
  color: string;
  amount: number;
  label: string;
};

function CardStatistic({ amount, color, label }: CardStatisticProps) {
  return (
    <Card className={classes.card_statistic} style={{ borderColor: color }}>
      <Text fz={24}>{label}</Text>
      <Text fz={30} fw={"bold"}>
        {amount}
      </Text>
    </Card>
  );
}

const DashboardAdmin = () => {
  const computedColorScheme = useComputedColorScheme("light");
  const light = computedColorScheme == "light";

  const stats = [
    {
      label: "Total Barang",
      total: 100,
      Icon: BarChartHorizontalBig,
      color: light ? "#97E0FF" : "#7db7d0",
    },
    {
      label: "Baik",
      total: 60,
      Icon: PackageCheck,
      color: light ? "#B2FF97" : "#7ce058",
      prefix: "%",
    },
    {
      label: "Rusak Ringan",
      total: 10,
      Icon: ScanLine,
      color: light ? "#FFE297" : "#d1b66d",
      prefix: "%",
    },
    {
      label: "Rusak Parah",
      total: 5,
      Icon: XCircle,
      color: "#FF97C3",
      prefix: "%",
    },
    {
      label: "Pengajuan",
      total: 5,
      Icon: ListTodo,
      color: "#8894FF",
      prefix: "",
    },
    {
      label: "Barang Keluar",
      total: 10,
      Icon: ListTodo,
      color: "#8894FF",
      prefix: "",
    },
  ];

  const data: TColDashboardAdmin[] = [];
  for (let i = 1; i < 10; i++) {
    const ganjil = i % 2 == 1;

    data.push({
      id: i,
      nama_barang: "buku" + i,
      jumlah: 1,
      kode_barang: "sdf",
      kondisi: ganjil ? "Baik" : "Kurang",
    });
  }

  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Text fz={24}>Status Barang</Text>
        <Grid gutter={{ base: 10, sm: 20 }}>
          {stats.map(({ color, label, total }, i) => (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={i}>
              <CardStatistic amount={total} color={color} label={label} />
            </Grid.Col>
          ))}
        </Grid>
        <Text mt={"lg"} fz={24}>
          Kumpulan barang per status
        </Text>
        <CustomTable
          loading={false}
          totalData={100}
          totalPage={10}
          totalRecords={10}
          columns={columnsDashboardAdmin()}
          data={data}
        />
      </PageContent>
    </>
  );
};

export default DashboardAdmin;
