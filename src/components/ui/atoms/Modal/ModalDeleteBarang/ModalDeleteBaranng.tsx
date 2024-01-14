import { Button, Group, Modal, Text, Title } from "@mantine/core";

interface ModalDeleteBarangProps {
    onClose: () => void;
    opened: boolean;
    title?: string;
    message?: string;
    onAccept: () => void;
}

export const ModalDeleteBarang = ({
    onClose,
    opened,
    title = "Hapus Barang",
    message = "Anda yakin ingin menghapus barang?",
    onAccept,
}: ModalDeleteBarangProps) => {
    return (
        <Modal
            centered
            opened={opened}
            onClose={onClose}
            title={<Title order={3}>{title}</Title>}
        >
            <Text>{message}</Text>
            <Group mt={20} justify="end">
                <Button variant="default" onClick={onClose}>
                    Batal
                </Button>
                <Button color="red" onClick={onAccept}>
                    Hapus
                </Button>
            </Group>
        </Modal>
    )
}
