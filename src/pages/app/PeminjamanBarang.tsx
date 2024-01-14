import { Button, Group } from "@mantine/core"
import { Plus } from "lucide-react"
import PageContent from "../../components/ui/atoms/PageContent"
import PageLabel from "../../components/ui/atoms/PageLabel"
import SelectButton from "../../components/ui/atoms/SelectButton"
import CustomTable from "../../components/ui/atoms/Table/CustomTable"
import { columnsPeminjamanBarang, dataPeminjamanBarang } from "../../utils/columns/peminjaman-barang"
import { ruanganLab } from "../../utils/constant"

const PeminjamanBarang = () => {
  const data = dataPeminjamanBarang
  for (let i = 1; i < 10; i++) {
    data.push({
      borroweddate: new Date().toISOString(),
      classborrower: "TKJ 2",
      id: 100 + i,
      indate: new Date().toISOString(),
      itemname: "Tp Link" + i,
      keterangan: "Lama",
      name: "Zaki Fairus" + i,
      nomor_telepon_peminjam: "082110977215" + i,
      totalborrowed: 100 + i
    })
  }

  return (
    <>
      <PageLabel label="Peminjaman Barang" />
      <PageContent>
        <Group justify="space-between">
          <SelectButton label="Ruangan" data={ruanganLab} />
          <Button leftSection={<Plus />}>
            Tambah Peminjaman
          </Button>
        </Group>
        <CustomTable
          totalPage={10}
          loading={false}
          totalData={100}
          totalRecords={10}
          columns={columnsPeminjamanBarang}
          data={data}
        />
      </PageContent>
    </>
  )
}

export default PeminjamanBarang