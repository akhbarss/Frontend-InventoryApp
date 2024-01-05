import * as Mantine from "@mantine/core"
import BG_LOGIN from "../../assets/bg-wp-content-login.png"
import classes from "../../pages/Login.module.css"

const LoginRightSide = () => {
    return (
        <Mantine.Box
            className={classes["right-side"]}
            style={{ backgroundImage: `url(${BG_LOGIN})` }}
        >
            <Mantine.Box className={classes["greetings"]}>
                <Mantine.Title fz={50}>Good Morning!</Mantine.Title>
                <Mantine.Title mt={10} fw={"normal"} order={3}>
                    Bekasi, Indonesia
                </Mantine.Title>
            </Mantine.Box>
        </Mantine.Box>
    )
}

export default LoginRightSide