import * as Mantine from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../store/features/loading.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { ResponseError } from "../../../utils/ResponseError";
import { getSession, login } from "../../../utils/api/auth";
import { User } from "../../../utils/context/auth-provider.context";
import { useAuth } from "../../../utils/hooks/useAuth";
import { showNotifications } from "../../../utils/showNotifications";
import { FormValuesLogin } from "../../../utils/types/form";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.loading);
  const loginForm = useForm<FormValuesLogin>({
    initialValues: {
      username: "admin",
      password: "12345678",
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

  const setRole = (roleName: string) => {
    setUser(
      (prev: User) =>
        ({
          ...prev,
          role: { ...prev.role, name: roleName },
        } as User)
    );
  };

  const onSubmit = (payload: DataFormLogin) => {
    dispatch(setLoading(true));
    loginMutation.mutate(payload, {
      onSuccess: async () => {
        try {
          const session = await getSession();

          const role = session?.payload.getSession.role.name;
          setRole(role);
          if (role == "SUPERADMIN") {
            dispatch(setLoading(false));
            navigate("/superadmin/dashboard");
          } else {
            dispatch(setLoading(false));
            navigate("/dashboard");
          }
          showNotifications({
            message: "Welcome to Inventory App!",
            title: "Login Success!",
            type: "success",
          });
        } catch (error) {
          dispatch(setLoading(false));
          console.log({error})
        }
      },
      onError: (err: any) => {
        console.log({ err });
        dispatch(setLoading(false));
        ResponseError(err);
      },
    });
  };

  return (
    <form
      className={classes["form-wrapper"]}
      onSubmit={loginForm.onSubmit(onSubmit)}
    >
      <Mantine.Stack gap={""}>
        <Mantine.TextInput
          size="md"
          disabled={isLoading}
          label="Username"
          classNames={{ label: classes.label, error: classes.error }}
          {...loginForm.getInputProps("username")}
          autoFocus={true}
        />

        <Mantine.PasswordInput
          disabled={isLoading}
          size="md"
          label="Password"
          classNames={{ label: classes.label, error: classes.error }}
          {...loginForm.getInputProps("password")}
        />

        <Mantine.Button
          mt={40}
          size="md"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Login
        </Mantine.Button>
      </Mantine.Stack>
    </form>
  );
};

export default LoginForm;
