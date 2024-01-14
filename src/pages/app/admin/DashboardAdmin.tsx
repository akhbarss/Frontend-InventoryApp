import { Grid, useComputedColorScheme } from "@mantine/core"
import { BarChartHorizontalBig, FolderClock, HelpCircle, Import, ListTodo, PackageCheck, ScanLine, XCircle } from "lucide-react"
import { CardClass } from "../../../components/ui/atoms/CardClass/CardClass"
import PageContent from "../../../components/ui/atoms/PageContent"
import PageLabel from "../../../components/ui/atoms/PageLabel"

const DashboardAdmin = () => {
  const computedColorScheme = useComputedColorScheme("light");
  const light  = computedColorScheme == "light"

  const stats = [
    {
      label: "Total Barang",
      total: 100,
      Icon: BarChartHorizontalBig,
      color: light ? "#97E0FF"   : "#7db7d0"
    },
    {
      label: "Kondisi Baik",
      total: 100,
      Icon: PackageCheck,
      color: light ? "#B2FF97" : "#56774a"
    },
    {
      label: "Kondisi Ringan",
      total: 100,
      Icon: ScanLine,
      color:  light ? "#FFE297" : "#d1b66d"
    },
    {
      label: "Kondisi Rusak Berat",
      total: 100,
      Icon: XCircle,
      color: "#FF97C3"
    },
    {
      label: "Permintaan Barang",
      total: 100,
      Icon: ListTodo,
      color: "#8894FF"
    },
    {
      label: "Barang Hilang",
      total: 100,
      Icon: HelpCircle,
      color: "#FF7878"
    },
    {
      label: "Barang Lama",
      total: 100,
      Icon: FolderClock,
      color: "#E39B2E"
    },
    {
      label: "Barang Baru",
      total: 100,
      Icon: Import,
      color: "#52EBC6"
    },
  ]


  return (
    <>
      <PageLabel label="Dashboard" />
      <PageContent>
        <Grid>
          {stats.map(({ label, total, Icon, color }) => (
            <Grid.Col span={6} key={label}>
              <CardClass title={label} total={total} Icon={Icon} color={color} />
            </Grid.Col>
          ))}
        </Grid>
      </PageContent>
    </>
  )
}

export default DashboardAdmin