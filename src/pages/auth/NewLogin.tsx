import * as Mantine from "@mantine/core"
import { LOGO_YATINDO } from "../../assets/image/Logo_Yatindo_IMAGE"
import classes from "./NewLogin.module.css"
import { isNotEmpty, useForm } from "@mantine/form"
import { useNavigate } from "react-router-dom"
import { FormValuesLogin } from "../../types/form"

const NewLogin = () => {
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
        <Mantine.Paper className={classes.root_login}>
            <div className={classes.overlay} />
            <Mantine.Card className={classes.card_login}>
                <Mantine.Flex gap={20} align={"center"} justify={"center"} mt={30}>
                    <Mantine.Image src={LOGO_YATINDO} className={classes.logo} />
                    <Mantine.Divider
                        size={"xs"}
                        color="white"
                        orientation="vertical"
                    />
                    <Mantine.Box >
                        <Mantine.Text c="white" className={classes.text_school}>
                            Aplikasi <br /> Inventaris <br />Barang Sekolah
                        </Mantine.Text>
                    </Mantine.Box>
                </Mantine.Flex>

                <Mantine.Box
                    component="form"
                    className={classes.form_input}
                    onSubmit={loginForm.onSubmit(onSubmit)}
                >
                    <Mantine.Stack>
                        <Mantine.TextInput
                            radius={"xl"}
                            label="Username"
                            placeholder="Username"
                            classNames={{
                                input: classes.input,
                                label: classes.label_input
                            }}
                            {...loginForm.getInputProps("username")}
                        />
                        <Mantine.PasswordInput
                            radius={"xl"}
                            label="Password"
                            placeholder="Password"
                            classNames={{
                                input: classes.input,
                                label: classes.label_input,
                                visibilityToggle: classes.visibilityToggle
                            }}
                            {...loginForm.getInputProps("password")}
                        />
                    </Mantine.Stack>

                    <Mantine.Box className={classes.wrapper_action}>
                        <Mantine.Button variant="white" w={"200px"} radius={"xl"} type="submit">
                            Login
                        </Mantine.Button>
                    </Mantine.Box>
                </Mantine.Box>
            </Mantine.Card>
            <Mantine.Box className={classes.greetings} >
                <Mantine.Title className={classes.greetings_text} fz={50}>Hello!</Mantine.Title>
                <Mantine.Title className={classes.greetings_text} fz={50}>Let's work!</Mantine.Title>
            </Mantine.Box>
        </Mantine.Paper>
    )
}

export default NewLogin