import { ActionIcon, Card, Group, Select, Text, ThemeIcon } from '@mantine/core'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
    return (
        <Card withBorder shadow='md' p={"xs"} component='section'>
            <Group justify='end'>
                <Text>1 &mdash; 5 of 100 items</Text>
                <Group gap={5}>
                    <ActionIcon variant='default'>
                        <IoIosArrowBack />
                    </ActionIcon>
                    <ThemeIcon variant='default'>
                        1
                    </ThemeIcon>
                    <ActionIcon variant='default'>
                        <IoIosArrowForward />
                    </ActionIcon>
                </Group>
                <Select
                    // value={limit.toString()}
                    allowDeselect={false}
                    defaultValue={"10"}
                    // label={`Halaman ${currentPage ?? "_"} dari ${totalPage ?? "_"}`}
                    data={Array.from(new Set([5, 10, 20, 30, 40, 50, ])).map(
                        (pageSize) => {
                            return {
                                value: pageSize.toString(),
                                label: `Menampilkan ${pageSize
                                    } Data`,
                            };
                        }
                    )}
                />
            </Group>
        </Card>
    )
}

export default Pagination