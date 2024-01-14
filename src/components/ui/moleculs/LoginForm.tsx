import * as Mantine from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { useNavigate } from "react-router-dom"
import { FormValuesLogin } from "../../types/form"
import classes from "./LoginForm.module.css"

const LoginForm = () => {
    const navigate = useNavigate()
    const loginForm = useForm<FormValuesLogin>({
        initialValues: {
            username: "",
            password: ""
        },
        validate: {
            username: isNotEmpty("Harap isi username anda!"),
            password: isNotEmpty("Harap isi password anda!"),
        }
    })

    type DataFormLogin = typeof loginForm.values

    const onSubmit = (e: DataFormLogin) => {
        console.log({ e })
        navigate("/dashboard")
    }

    return (
        <form
            onSubmit={loginForm.onSubmit(onSubmit)}
            className={classes['form-wrapper']}
        >
            <Mantine.Stack>
                <Mantine.TextInput
                    size="md"
                    label="Username"
                    styles={{
                        label: { fontWeight: "bold", color: "white" },
                        error: { color: "#ffa29c", fontWeight: "bold" }
                    }}
                    {...loginForm.getInputProps("username")}
                />
                <Mantine.PasswordInput
                    size="md"
                    label="Password"
                    styles={{
                        label: { fontWeight: "bold", color: "white" },
                        error: { color: "#ffa29c", fontWeight: "bold" }
                    }}
                    {...loginForm.getInputProps("password")}
                />
                <Mantine.Group justify="flex-end">
                    <Mantine.Button
                        w={150}
                        size="md"
                        radius={"lg"}
                        type="submit"
                        className={classes.button}
                    >
                        Login
                    </Mantine.Button>
                </Mantine.Group>
            </Mantine.Stack>
            <Mantine.Text mt={20} ta={"center"} fw={"bold"} c={"white"}>
                Copyright by D-Coders
            </Mantine.Text>
        </form>
    )
}

export default LoginForm