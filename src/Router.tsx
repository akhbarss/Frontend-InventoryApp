import { Suspense } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Provider from "./Provider";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import BelumDiProsesPage from "./pages/barang/BelumDiProsesPage";
import Dashboard from "./pages/Dashboard";
import DataBarangPage from "./pages/DataBarangPage";
import Login from "./pages/Login";
import ManajemenUserPage from "./pages/ManajemenUserPage";
import TelahDiProsesPage from "./pages/barang/TelahDiProsesPage";
import HabisPakaiPage from "./pages/barang/HabisPakaiPage";
import TidakHabisPakaiPage from "./pages/barang/TidakHabisPakaiPage";
import PermintaanBarang from "./pages/PermintaanBarang";

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
                        element: <Login />
                    }
                ]
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        // admin & superadmin
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        // admin & superadmin
                        path: "data-barang",
                        element: <DataBarangPage />
                    },
                    {
                        // admin
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
                        // admin
                        path: "permintaan-barang",
                        element: <PermintaanBarang />
                    },
                    {
                        // superadmin
                        path: "permintaan-barang-superadmin",
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
                        // superadmin
                        path: "manajemen-user",
                        element: <ManajemenUserPage />
                    }
                ]
            }
        ]
    }
])


export const Router = () => {
    return <RouterProvider router={routes} />
}