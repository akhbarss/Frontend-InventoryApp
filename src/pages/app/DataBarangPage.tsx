// import { isNotEmpty } from "@mantine/form";
// import { DataBarangFormProvider, useDataBarangForm } from "../../components/context/form-context";
// import PageLabel from "../../components/ui/atoms/PageLabel";
// import ContentDataBarang from "../../components/ui/moleculs/DataBarang/ContentDataBarang";

// const DataBarangPage = () => {
//   const form = useDataBarangForm({
//     initialValues: {
//       id: null,
//       barang: '',
//       jumlah: null,
//       keterangan: "",
//       kodeBarang: '',
//       lokasi: ''
//     },
//     validate: {
//       barang: isNotEmpty(""),
//       jumlah: isNotEmpty(""),
//       keterangan: isNotEmpty(""),
//       kodeBarang: isNotEmpty(""),
//       lokasi: isNotEmpty(""),
//     }
//   });
//   return (
//     <>
//       <PageLabel label="Data Barang" />
//       <DataBarangFormProvider form={form}>
//         <ContentDataBarang />
//       </DataBarangFormProvider>
//     </>
//   )
// }

// export default DataBarangPage