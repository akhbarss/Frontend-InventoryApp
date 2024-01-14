import * as Mantine from "@mantine/core"
import classes from "../../pages/Login.module.css"
import LogoYatindo from "../atoms/LogoYatindo"
import LoginForm from "./LoginForm"

const LoginLeftSide = () => {
    return (
        <Mantine.Box className={classes["wp-school-left"]}>
            <LogoYatindo />
            <LoginForm />
        </Mantine.Box>
    )
}

export default LoginLeftSide