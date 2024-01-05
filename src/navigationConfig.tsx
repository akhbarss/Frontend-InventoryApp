import { FaHome } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { IoGitBranch } from "react-icons/io5";

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

export const menus: TMenusNavigations[] = [
    getItem("Dashboard", "/dashboard", <FaHome />),
    getItem("Data Barang", "/data-barang", <IoGitBranch />),
    getItem("Barang Keluar Masuk", undefined, <FaRoad />, [
        getItem("Barang Habis Pakai", '/barang-keluar-masuk/barang-habis-pakai'),
        getItem("Barang Tidak Habis Pakai", '/barang-keluar-masuk/barang-tidak-habis-pakai'),
    ]),
    getItem("Permmintaan Barang", "/permintaan-barang", <IoGitBranch />),
    getItem("Permintaan Barang", undefined, <FaRoad />, [
        getItem("Belum di Proses", '/permintaan-barang-superadmin/belum-diproses'),
        getItem("Telah di Proses", '/permintaan-barang-superadmin/telah-diproses'),
    ]),
    getItem("Manajemen User", "/manajemen-user", <IoGitBranch />),
];
