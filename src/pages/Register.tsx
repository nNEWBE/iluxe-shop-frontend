"use client";

import { useNavigate } from "react-router-dom";
import Button from "../components/ui/UiButton";
import { IoLogIn } from "react-icons/io5";
import Input from "../components/ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/auth/authApi";
import { toast } from "sonner";
import Account from "../components/ui/Account/Account";
import { ApiError } from "../error/error";
import { useAppDispatch } from "../redux/hooks";
import { setUserAfterRegister } from "../redux/features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Regsitering in");
    const defaultUserInfo = { email: data?.email, password: data?.password };
    try {
      await registerUser(data).unwrap();
      dispatch(setUserAfterRegister({ userInfo: defaultUserInfo }));
      toast.success("Registered successfully", { id: toastId, duration: 2000 });
      navigate("/login");
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
      type="Register"
      img="https://res.cloudinary.com/dorjgyfdl/image/upload/v1742466738/Register_Bg_rvlzib.jpg"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-2 font-madimi"
      >
        <Input
          label="Name"
          type="name"
          errors={errors?.name?.message as string}
          register={register("name", {
            required: {
              value: true,
              message: "Enter your name",
            },
            minLength: {
              value: 3,
              message: "Enter at least 3 characters",
            },
          })}
        />
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
        <Button text="Register" icon={<IoLogIn />} />
      </form>
    </Account>
  );
};

export default Register;
