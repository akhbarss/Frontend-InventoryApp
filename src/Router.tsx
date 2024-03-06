import { Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Providers from "./Providers";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import PeminjamanBarang from "./pages/app/PeminjamanBarang";
import Dashboard from "./pages/app/admin/DashboardAdmin";
import DataBarangAdmin from "./pages/app/admin/DataBarangAdmin";
import HabisPakaiPage from "./pages/app/barang/HabisPakaiPage";
import TidakHabisPakaiPage from "./pages/app/barang/TidakHabisPakaiPage";
import ATK from "./pages/app/permintaan-barang/ATK";
import NonATK from "./pages/app/permintaan-barang/NonATK";

import BarangDiPinjam from "./pages/app/BarangDiPinjam";
import ManajemenAdminPage from "./pages/app/ManajemenAdminPage";
import BelumDiProsesPage from "./pages/app/barang/BelumDiProsesPage";
import TelahDiProsesPage from "./pages/app/barang/TelahDiProsesPage";
import ManajemenBarang from "./pages/app/manajemen-barang/ManajemenBarang";
import DashboardSuperAdmin from "./pages/app/superadmin/DashboardSuperAdmin";
import DataBarangSuperAdmin from "./pages/app/superadmin/DataBarangSuperAdmin";
import Login from "./pages/auth/Login";
import Loading from "./components/ui/atoms/Loading";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Providers>
    ),
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "auth/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            Component: lazy(() => import("./pages/app/admin/DashboardAdmin")),
          },
          {
            path: "data-barang",
            element: <DataBarangAdmin />,
          },
          {
            path: "barang-keluar-masuk",
            children: [
              {
                path: "barang-habis-pakai",
                element: <HabisPakaiPage />,
              },
              {
                path: "barang-tidak-habis-pakai",
                element: <TidakHabisPakaiPage />,
              },
            ],
          },
          {
            path: "manajemen-barang",
            element: <ManajemenBarang />,
          },
          {
            path: "permintaan-barang",
            children: [
              {
                path: "atk",
                element: <ATK />,
              },
              {
                path: "non-atk",
                element: <NonATK />,
              },
            ],
          },
          {
            path: "peminjaman-barang",
            element: <PeminjamanBarang />,
          },
          {
            path: "superadmin",
            children: [
              {
                path: "dashboard",
                element: <DashboardSuperAdmin />,
              },
              {
                path: "data-barang",
                element: <DataBarangSuperAdmin />,
              },
              {
                path: "data-barang",
                element: <DataBarangSuperAdmin />,
              },
              {
                path: "permintaan-barang",
                children: [
                  {
                    path: "belum-diproses",
                    element: <BelumDiProsesPage />,
                  },
                  {
                    path: "telah-diproses",
                    element: <TelahDiProsesPage />,
                  },
                ],
              },
              {
                path: "manajemen-admin",
                element: <ManajemenAdminPage />,
              },
              {
                path: "barang-dipinjam",
                element: <BarangDiPinjam />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
