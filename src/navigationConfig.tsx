import {
  ArrowRightLeft,
  BarChartHorizontalBig,
  GitPullRequestArrow,
  ScrollText,
  Users,
} from "lucide-react";
import { MdOutlineDashboard } from "react-icons/md";

type TMenus = {
  label: string;
  icon?: JSX.Element;
  path?: string;
};

type TMenusNavigations = {
  children?: TMenus[];
} & TMenus;

function getItem(
  label: string,
  path?: string,
  icon?: JSX.Element,
  children?: TMenus[]
): TMenusNavigations {
  return {
    label,
    icon,
    path,
    children,
  } as TMenusNavigations;
}

export const menusAdmin: TMenusNavigations[] = [
  getItem("Dashboard", "/dashboard", <MdOutlineDashboard />),
  // getItem("Data Barang", "/data-barang", <BarChartHorizontalBig size={16} />),
  getItem("Data Barang", undefined, <BarChartHorizontalBig size={17} />, [
    getItem("Habis Pakai", "/data-barang/habis-pakai"),
    getItem("Tidak Habis Pakai", "/data-barang/tidak-habis-pakai"),
  ]),
  getItem("Manajemen Barang", undefined, <ArrowRightLeft size={17} />, [
    getItem("Habis Pakai", "/manajemen-barang/habis-pakai"),
    getItem("Tidak Habis Pakai", "/manajemen-barang/tidak-habis-pakai"),
  ]),
  getItem("Permintaan Barang", undefined, <GitPullRequestArrow size={17} />, [
    getItem("ATK", "/permintaan-barang/atk"),
    getItem("Non ATK", "/permintaan-barang/non-atk"),
  ]),
  getItem("Manajemen Kode", "/manajemen-kode", <ScrollText size={20} />),
  // getItem("Manajemen Barang", "/manajemen-barang", ),
  // getItem("Permintaan Barang", undefined, <FaRoad />, [
  //     getItem("Belum di Proses", '/permintaan-barang-superadmin/belum-diproses'),
  //     getItem("Telah di Proses", '/permintaan-barang-superadmin/telah-diproses'),
  // ]),
  // getItem("Peminjaman Barang", "/peminjaman-barang", <Repeat2 size={17} />),
];

export const menusSuperAdmin: TMenusNavigations[] = [
  getItem("Dashboard", "/superadmin/dashboard", <MdOutlineDashboard />),
  getItem(
    "Data Barang",
    // "/superadmin/data-barang",
    undefined,
    <BarChartHorizontalBig size={16} />,
    [
      getItem("Habis Pakai", "/superadmin/data-barang/habis-pakai"),
      getItem("Tidak Habis Pakai", "/superadmin/data-barang/tidak-habis-pakai"),
    ]
  ),
  getItem(
    "Permintaan Barang",
    "/superadmin/permintaan-barang",
    <GitPullRequestArrow size={17} />
  ),
  getItem("Manajemen User", "/superadmin/manajemen-user", <Users size={18} />),
  // getItem("Barang Di Pinjam", "/superadmin/barang-dipinjam", <Package size={18}/>),
];
