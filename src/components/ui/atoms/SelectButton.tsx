import { Button, Menu } from '@mantine/core';
import { IoMdArrowDropdown } from "react-icons/io";

interface SelectButtonProps {
    label: string;
    data: { label: string }[]
}

const SelectButton = ({ label ,data}: SelectButtonProps) => {
    return (
        <>
            <Menu transitionProps={{ transition: "scale" }} width={200} shadow="md" styles={{ arrow: {} }} position='bottom-start'>
                <Menu.Target>
                    <Button rightSection={<IoMdArrowDropdown />}>{label}</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {data && data.map(item => (
                        <Menu.Item key={item.label}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default SelectButton