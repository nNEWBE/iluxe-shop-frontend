"use client";

import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { IoLogIn } from "react-icons/io5";
import Input from "../components/ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  removeRegisterUser,
  selectDefaultUser,
  setUser,
  TUser,
} from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import Account from "../components/ui/Account/Account";
import { ApiError } from "../error/error";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state?.from);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const defaultUser = useAppSelector(selectDefaultUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: defaultUser?.email,
      password: defaultUser?.password,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res?.data?.token?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data?.token?.accessToken }));
      dispatch(removeRegisterUser());
      reset();
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });

      navigate(location?.state?location.state?.from : "/");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          {
            id: toastId,
            duration: 2000,
          }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  return (
    <Account
      type="Login"
      img="https://res.cloudinary.com/dorjgyfdl/image/upload/v1742466741/Login_Bg_d3it66.jpg"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-2 font-madimi"
      >
        <Input
          label="Email"
          type="email"
          errors={errors?.email?.message as string}
          register={register("email", {
            required: {
              value: true,
              message: "Enter your email address",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          errors={errors?.password?.message as string}
          register={register("password", {
            required: {
              value: true,
              message: "Enter your password",
            },
            minLength: {
              value: 6,
              message: "Enter at least 6 characters",
            },
          })}
        />
        <Button text="Login" icon={<IoLogIn />} />
      </form>
    </Account>
  );
};

export default Login;
