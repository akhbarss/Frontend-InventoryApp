// import {
//   Box,
//   Button,
//   Group,
//   NumberInput,
//   Select,
//   Text,
//   TextInput,
// } from "@mantine/core";
// import { ruanganLab } from "../../../../utils/constant";
// import { useDataBarangFormContext } from "../../../../utils/context/form-context";
// import { CategoryItem, ItemSource } from "../../../../utils/types/items.type";
// import { useAppSelector } from "../../../../store/store";
// import { useGetClassRoom } from "../../../../utils/hooks/useGetClassRoom";

// export const FormDataBarang = () => {
//   const form = useDataBarangFormContext();
//   const { errors } = form;

//   const classRoom = useGetClassRoom();
//   console.log({ classRoom });

//   return (
//     <>
//       <TextInput
//         size="sm"
//         label="Nama Barang"
//         {...form.getInputProps("name")}
//       />
//       <Group>
//         <Select
//           size="sm"
//           label="Lokasi"
//           data={classRoom}
//           {...form.getInputProps("class_id")}
//         />

//         {/* <NumberInput
//           w={100}
//           size="sm"
//           style={{ flex: 1 }}
//           required
//           hideControls
//           label="Jumlah"
//           decimalSeparator=","
//           allowDecimal={false}
//           error={errors.jumlah}
//           allowNegative={false}
//           leftSectionWidth={50}
//           thousandSeparator="."
//           allowLeadingZeros={false}
//           // value={form.values. ?? 0}
//           onValueChange={({ floatValue }) => {
//             // form.setFieldValue(
//             //   "jumlah",
//             //   floatValue as unknown as number | null
//             // );
//           }}
//         /> */}
//       </Group>

//       <Box>
//         <Text size="sm" mb={7}>
//           Kode Barang
//         </Text>
//         <Group>
//           <TextInput
//             w={55}
//             size="sm"
//             maxLength={3}
//             {...form.getInputProps("item_code.prefix_code")}
//           />

//           <TextInput
//             size="sm"
//             style={{ flex: 1 }}
//             {...form.getInputProps("item_code.value_code")}
//           />
//           <Button size="sm">Generate</Button>
//         </Group>
//       </Box>

//       <Select
//         label="Kategori Barang"
//         data={Object.values(CategoryItem)}
//         {...form.getInputProps("category_item")}
//       />

//       <Select
//         label="Asal Barang"
//         data={Object.values(ItemSource)}
//         {...form.getInputProps("source_fund")}
//       />

//       <NumberInput
//         size="sm"
//         required
//         hideControls
//         label="Harga Persatuan"
//         decimalSeparator=","
//         allowDecimal={false}
//         error={errors.unit_price}
//         allowNegative={false}
//         leftSectionWidth={50}
//         thousandSeparator="."
//         allowLeadingZeros={false}
//         value={form.values.unit_price ?? 0}
//         onValueChange={({ floatValue }) => {
//           form.setFieldValue("unit_price", floatValue as number);
//         }}
//       />

//       {/* <Select
//         label="Kondisi Barang"
//         data={["Baik", "Rusak Ringan", "Rusak Berat"]}
//         {...form.getInputProps("kondisi")}
//       /> */}
//     </>
//   );
// };
