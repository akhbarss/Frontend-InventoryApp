import { Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Providers from "./components/layouts/Providers/Provider";
import RolePage from "./components/layouts/RolePage";

import Loading from "./components/ui/atoms/Loading/Loading";
import { loader as DataBarang_HabisPakai_Loader } from "./pages/app/admin/DataBarang/HabisPakai"

const Login = lazy(() => import("./pages/auth/Login"));

const DashboardAdmin = lazy(() => import("./pages/app/admin/DashboardAdmin"));
const DataBarang_HabisPakai = lazy(() => import("./pages/app/admin/DataBarang/HabisPakai"));
const DataBarang_TidakHabisPakai = lazy(() => import("./pages/app/admin/DataBarang/TidakHabisPakai"));
const ManajemenBarang_HabisPakai = lazy(() => import("./pages/app/admin/ManajemenBarang/HabisPakai"));
const ManajemenBarang_TidakHabisPakai = lazy(() => import("./pages/app/admin/ManajemenBarang/TidakHabisPakai"));
const PermintaanBarang_ATK = lazy(() => import("./pages/app/admin/PermintaanBarang/ATK"));
const PermintaanBarang_NonATK = lazy(() => import("./pages/app/admin/PermintaanBarang/NonATK"));

const Dashboard_SuperAdmin = lazy(() => import("./pages/app/superadmin/Dashboard"));
const DataBarang_SuperAdmin = lazy(() => import("./pages/app/superadmin/DataBarang"));
const PermintaanBarang_BelumDiProses = lazy(() => import("./pages/app/superadmin/PermintaanBarang/BelumDiProses"));
const PermintaanBarang_TelahDiProses = lazy(() => import("./pages/app/superadmin/PermintaanBarang/BelumDiProses"));
const ManajemenUser = lazy(() => import("./pages/app/superadmin/ManajemenUser"));


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
            element: (
              <RolePage roles={["ADMIN_TJKT"]}>
                <Outlet />
              </RolePage>
            ),
            children: [
              {
                path: "dashboard",
                element: <DashboardAdmin />,
              },
              {
                path: "data-barang",
                element: <Outlet />,
                children: [
                  {
                    path: "habis-pakai",
                    element: <DataBarang_HabisPakai />,
                    loader: DataBarang_HabisPakai_Loader,
                  },
                  {
                    path: "tidak-habis-pakai",
                    element: <DataBarang_TidakHabisPakai />,
                  },
                ],
              },
              {
                path: "manajemen-barang",
                children: [
                  {
                    path: "barang-habis-pakai",
                    element: <ManajemenBarang_HabisPakai />,
                  },
                  {
                    path: "barang-tidak-habis-pakai",
                    element: <ManajemenBarang_TidakHabisPakai />,
                  },
                ],
              },
              {
                path: "permintaan-barang",
                children: [
                  {
                    path: "atk",
                    element: <PermintaanBarang_ATK />,
                  },
                  {
                    path: "non-atk",
                    element: <PermintaanBarang_NonATK />,
                  },
                ],
              },
              // {
              //   path: "peminjaman-barang",
              //   element: <PeminjamanBarang />,
              // },
            ],
          },
          {
            path: "superadmin",
            element: (
              <RolePage roles={["SUPERADMIN"]}>
                <Outlet />
              </RolePage>
            ),
            children: [
              {
                path: "dashboard",
                element: <Dashboard_SuperAdmin />,
              },
              {
                path: "data-barang",
                element: <DataBarang_SuperAdmin />,
              },
              {
                path: "permintaan-barang",
                children: [
                  {
                    path: "belum-diproses",
                    element: <PermintaanBarang_BelumDiProses />,
                  },
                  {
                    path: "telah-diproses",
                    element: <PermintaanBarang_TelahDiProses />,
                  },
                ],
              },
              {
                path: "manajemen-admin",
                element: <ManajemenUser />,
              },
              // {
              //   path: "barang-dipinjam",
              //   element: <BarangDiPinjam />,
              // },
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
