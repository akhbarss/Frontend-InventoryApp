import { Suspense } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Provider from "./Provider";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import NewLogin from "./pages/auth/NewLogin";

import Dashboard from "./pages/app/admin/DashboardAdmin";
import DataBarangAdmin from "./pages/app/admin/DataBarangAdmin";
import PeminjamanBarang from "./pages/app/PeminjamanBarang";
import HabisPakaiPage from "./pages/app/barang/HabisPakaiPage";
import TidakHabisPakaiPage from "./pages/app/barang/TidakHabisPakaiPage";
import ATK from "./pages/app/permintaan-barang/ATK";
import NonATK from "./pages/app/permintaan-barang/NonATK";

import DashboardSuperAdmin from "./pages/app/superadmin/DashboardSuperAdmin";
import DataBarangSuperAdmin from "./pages/app/superadmin/DataBarangSuperAdmin";
import BelumDiProsesPage from "./pages/app/barang/BelumDiProsesPage";
import TelahDiProsesPage from "./pages/app/barang/TelahDiProsesPage";
import ManajemenUserPage from "./pages/app/ManajemenUserPage";
import BarangDiPinjam from "./pages/app/BarangDiPinjam";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <Provider>
                <Suspense fallback="loading...">
                    <Outlet />
                </Suspense>
            </Provider>
        ),
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "auth/login",
                        element: <NewLogin />
                    }
                ]
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "data-barang",
                        element: <DataBarangAdmin />
                    },
                    {
                        path: "barang-keluar-masuk",
                        children: [
                            {
                                path: "barang-habis-pakai",
                                element: <HabisPakaiPage />
                            },
                            {
                                path: "barang-tidak-habis-pakai",
                                element: <TidakHabisPakaiPage />
                            },
                        ]
                    },
                    {
                        path: "permintaan-barang",
                        children: [
                            {
                                path: "atk",
                                element: <ATK />
                            },
                            {
                                path: "non-atk",
                                element: <NonATK />
                            },
                        ]
                    },
                    {
                        path: "peminjaman-barang",
                        element: <PeminjamanBarang />
                    },
                    {
                        path: "superadmin",
                        children: [
                            {
                                path: "dashboard",
                                element: <DashboardSuperAdmin />
                            },
                            {
                                path: "data-barang",
                                element: <DataBarangSuperAdmin />
                            },
                            {
                                path: "data-barang",
                                element: <DataBarangSuperAdmin />
                            },
                            {
                                path: "permintaan-barang",
                                children: [
                                    {
                                        path: "belum-diproses",
                                        element: <BelumDiProsesPage />
                                    },
                                    {
                                        path: "telah-diproses",
                                        element: <TelahDiProsesPage />
                                    },
                                ]
                            },
                            {
                                path: "manajemen-admin",
                                element: <ManajemenUserPage />
                            },
                            {
                                path: "barang-dipinjam",
                                element: <BarangDiPinjam />
                            },
                        ]
                    }

                ]
            }
        ]
    }
])


export const Router = () => {
    return <RouterProvider router={routes} />
}