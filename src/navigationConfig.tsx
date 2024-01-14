import { ArrowRightLeft, BarChartHorizontalBig, GitPullRequestArrow, Package, Repeat2, Users } from "lucide-react";
import { MdOutlineDashboard } from "react-icons/md";

type TMenus = {
    label: string;
    icon?: JSX.Element;
    path?: string;
}

type TMenusNavigations = {
    children?: TMenus[]
} & TMenus

function getItem(
    label: string,
    path?: string,
    icon?: JSX.Element,
    children?: TMenus[]
): TMenusNavigations {
    return {
        label, icon, path, children
    } as TMenusNavigations;
}

export const menusAdmin: TMenusNavigations[] = [
    getItem("Dashboard", "/dashboard", <MdOutlineDashboard />),
    getItem("Data Barang", "/data-barang", <BarChartHorizontalBig size={16} />),
    getItem("Barang Keluar Masuk", undefined, <ArrowRightLeft size={17} />, [
        getItem("Barang Habis Pakai", '/barang-keluar-masuk/barang-habis-pakai'),
        getItem("Barang Tidak Habis Pakai", '/barang-keluar-masuk/barang-tidak-habis-pakai'),
    ]),
    getItem("Permintaan Barang", undefined, <GitPullRequestArrow size={17} />, [
        getItem("ATK", "/permintaan-barang/atk"),
        getItem("Non ATK", "/permintaan-barang/non-atk"),
    ]),
    // getItem("Permintaan Barang", undefined, <FaRoad />, [
    //     getItem("Belum di Proses", '/permintaan-barang-superadmin/belum-diproses'),
    //     getItem("Telah di Proses", '/permintaan-barang-superadmin/telah-diproses'),
    // ]),
    getItem("Peminjaman Barang", "/peminjaman-barang", <Repeat2 size={17} />),
];

export const menusSuperAdmin: TMenusNavigations[] = [
    getItem("Dashboard", "/superadmin/dashboard", <MdOutlineDashboard />),
    getItem("Data Barang", "/superadmin/data-barang", <BarChartHorizontalBig size={16} />),
    getItem("Permintaan Barang", undefined, <GitPullRequestArrow size={17} />, [
        getItem("Belum di Proses", '/superadmin/permintaan-barang/belum-diproses'),
        getItem("Telah di Proses", '/superadmin/permintaan-barang/telah-diproses'),
    ]),
    getItem("Manajemen Admin", "/superadmin/manajemen-admin", <Users size={18} />),
    getItem("Barang Di Pinjam", "/superadmin/barang-dipinjam", <Package size={18}/>),
];
