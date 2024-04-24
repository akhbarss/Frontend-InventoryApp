import { Suspense } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Providers from "./components/layouts/Providers/Provider";
import RolePage from "./components/layouts/RolePage";

import ApplicationLayout from "@components/layouts/Application.layout";
import Error from "@components/ui/atoms/Error";
import NotFound from "@components/ui/atoms/NotFound";
import DashboardAdmin from "@pages/app/admin/DashboardAdmin";
import { DataBarangLayout } from "@pages/app/admin/DataBarang/DataBarangLayout.admin";
import DataBarang_TidakHabisPakai from "@pages/app/admin/DataBarang/TidakHabisPakai/index.page.admin";
import ManajemenBarang_HabisPakai from "@pages/app/admin/ManajemenBarang/HabisPakai/index.page";
import ManajemenBarangLayout from "@pages/app/admin/ManajemenBarang/ManajemenBarangLayout";
import ManajemenBarang_TidakHabisPakai from "@pages/app/admin/ManajemenBarang/TidakHabisPakai";
import ManajemenKode from "@pages/app/admin/ManajemenKode";
import PermintaanBarang_ATK from "@pages/app/admin/PermintaanBarang/ATK/index.admin";
import PermintaanBarang_NonATK from "@pages/app/admin/PermintaanBarang/NonATK/index.admin";
import PermintaanBarangLayout from "@pages/app/admin/PermintaanBarang/PermintaanBarangLayout.admin";
import Dashboard_SuperAdmin from "@pages/app/superadmin/Dashboard/index.superadmin";
import DataBarang_SuperAdmin from "@pages/app/superadmin/DataBarang/index.superadmin";
import ManajemenUser from "@pages/app/superadmin/ManajemenUser";
import PermintaanBarang_BelumDiProses from "@pages/app/superadmin/PermintaanBarang/BelumDiProses";
import PermintaanBarang_TelahDiProses from "@pages/app/superadmin/PermintaanBarang/TelahDiProses";
import Login from "@pages/auth/Login";
import { QueryParamProvider } from "use-query-params";
import Loading from "./components/ui/atoms/Loading/Loading";
import DataBarang_HabisPakai from "./pages/app/admin/DataBarang/HabisPakai/index.page.admin"; // loader as DataBarang_HabisPakai_Loader,
import DataBarangLayoutSuperadmin from "@pages/app/superadmin/DataBarang/DataBarangLayout.superadmin";
import DataBarangHabisPakaiSuperAdmin from "@pages/app/superadmin/DataBarang/DataBarangHabisPakai.superadmin";
import DataBarangTidakHabisPakaiSuperAdmin from "@pages/app/superadmin/DataBarang/DataBarangTidakHabisPakai.superadmin";
import PermintaanBarangSuperAdmin from "@pages/app/superadmin/PermintaanBarang/PermintaanBarangSuperAdmin";

// const Login = lazy(() => import("./pages/auth/Login"));

// const DashboardAdmin = lazy(() => import("./pages/app/admin/DashboardAdmin"));
// const DataBarang_HabisPakai = lazy(() => import("./pages/app/admin/DataBarang/HabisPakai"));
// const DataBarang_TidakHabisPakai = lazy(() => import("./pages/app/admin/DataBarang/TidakHabisPakai"));
// const ManajemenBarang_HabisPakai = lazy(() => import("./pages/app/admin/ManajemenBarang/HabisPakai"));
// const ManajemenBarang_TidakHabisPakai = lazy(() => import("./pages/app/admin/ManajemenBarang/TidakHabisPakai"));
// const PermintaanBarang_ATK = lazy(() => import("./pages/app/admin/PermintaanBarang/ATK"));
// const PermintaanBarang_NonATK = lazy(() => import("./pages/app/admin/PermintaanBarang/NonATK"));

// const Dashboard_SuperAdmin = lazy(() => import("./pages/app/superadmin/Dashboard"));
// const DataBarang_SuperAdmin = lazy(() => import("./pages/app/superadmin/DataBarang"));
// const PermintaanBarang_BelumDiProses = lazy(() => import("./pages/app/superadmin/PermintaanBarang/BelumDiProses"));
// const PermintaanBarang_TelahDiProses = lazy(() => import("./pages/app/superadmin/PermintaanBarang/BelumDiProses"));
// const ManajemenUser = lazy(() => import("./pages/app/superadmin/ManajemenUser"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <ApplicationLayout>
              <Outlet />
            </ApplicationLayout>
          </Suspense>
        </Providers>
      </QueryParamProvider>
    ),
    errorElement: <Error />,
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
              <RolePage
                roles={["ADMIN_TJKT", "ADMIN_AK", "ADMIN_TO", "ADMIN_TE"]}
              >
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
                element: <DataBarangLayout />,
                children: [
                  {
                    path: "habis-pakai",
                    element: <DataBarang_HabisPakai />,
                  },
                  {
                    path: "tidak-habis-pakai",
                    element: <DataBarang_TidakHabisPakai />,
                  },
                ],
              },
              {
                path: "manajemen-barang",
                element: <ManajemenBarangLayout />,
                children: [
                  {
                    path: "habis-pakai",
                    element: <ManajemenBarang_HabisPakai />,
                  },
                  {
                    path: "tidak-habis-pakai",
                    element: <ManajemenBarang_TidakHabisPakai />,
                  },
                ],
              },
              {
                path: "permintaan-barang",
                element: <PermintaanBarangLayout />,
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
              {
                path: "manajemen-kode",
                element: <ManajemenKode />,
              },
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
                // element: <DataBarang_SuperAdmin />,
                element: <DataBarangLayoutSuperadmin />,
                children: [
                  {
                    path: "habis-pakai",
                    element: <DataBarangHabisPakaiSuperAdmin />,
                  },
                  {
                    path: "tidak-habis-pakai",
                    element: <DataBarangTidakHabisPakaiSuperAdmin />,
                  },
                ]
              },
              {
                path: "permintaan-barang",
                element: <PermintaanBarangSuperAdmin />
              },
              {
                path: "manajemen-user",
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
