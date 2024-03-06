import * as Mantine from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/auth";
import { FormValuesLogin } from "../../../utils/types/form";
import { showNotifications } from "../../../utils/showNotifications";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const loginForm = useForm<FormValuesLogin>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Harap isi username anda!"),
      password: isNotEmpty("Harap isi password anda!"),
    },
  });
  type DataFormLogin = typeof loginForm.values;

  const loginMutation = useMutation({
    mutationFn: login,
  });
  const loading = loginMutation.status == "pending";

  const onSubmit = (payload: DataFormLogin) => {
    loginMutation.mutate(payload, {
      onSuccess: () => {
        showNotifications({
          message: "Welcome to Inventory App!",
          title: "Login Success!",
          type: "success",
        });
        navigate("/dashboard");
      },
      onError: (err) => {
        console.log("login failed : ", err);
      },
    });
  };

  return (
    <form
      onSubmit={loginForm.onSubmit(onSubmit)}
      className={classes["form-wrapper"]}
    >
      <Mantine.Stack gap={"md"}>
        <Mantine.TextInput
          disabled={loading}
          autoFocus={true}
          size="md"
          label="Username"
          styles={{
            label: { fontWeight: "bold" },
            error: { color: "#ffa29c", fontWeight: "bold" },
          }}
          {...loginForm.getInputProps("username")}
        />

        <Mantine.PasswordInput
          disabled={loading}
          size="md"
          label="Password"
          styles={{
            label: { fontWeight: "bold" },
            error: { color: "#ffa29c", fontWeight: "bold" },
          }}
          {...loginForm.getInputProps("password")}
        />

        <Mantine.Button
          mt={40}
          size="md"
          fullWidth
          type="submit"
          loading={loading}
        >
          Login
        </Mantine.Button>
      </Mantine.Stack>
    </form>
  );
};

export default LoginForm;
