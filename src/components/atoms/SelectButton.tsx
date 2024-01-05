import { Button, Menu, Select } from '@mantine/core';
import { IoMdArrowDropdown } from "react-icons/io";

const SelectButton = () => {
    const itemSelectJurusan = [
        {
            label: "TJKT"
        },
        {
            label: "AKL"
        },
        {
            label: "TO"
        },
        {
            label: "TE"
        },
    ]

    return (
        <>
            <Menu transitionProps={{ transition: "scale" }} width={200} shadow="md" styles={{ arrow: {} }} position='bottom-start'>
                <Menu.Target>
                    <Button rightSection={<IoMdArrowDropdown />}>Ruangan</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {itemSelectJurusan.map(jurusan => (
                        <Menu.Item >
                            {jurusan.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </>

    )
}

export default SelectButton