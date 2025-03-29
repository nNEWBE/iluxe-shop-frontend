import React, { useState } from "react";
import { Modal, Input, Form, Button, ConfigProvider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FaUser, FaPhone, FaCity, FaMapMarkerAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "../../redux/api/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { ApiError } from "../../error/error";

interface FormData {
  name: string;
  contact: number;
  address: string;
  city: string;
}

const Dialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormData>();
  const token = useAppSelector(useCurrentToken);
  const { data } = useGetMeQuery(token);
  const id = data?.data?._id;
  const [updateUser] = useUpdateUserMutation();

  const showModal = () => setOpen(true);
  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormData) => {
    const userUpdatedData: { [key: string]: string | number } = {};

    if (data?.name) {
      userUpdatedData.name = data?.name;
    }

    if (data?.contact) {
      userUpdatedData.phone = data?.contact;
    }

    if (data?.address) {
      userUpdatedData.address = data?.address;
    }

    if (data?.city) {
      userUpdatedData.city = data?.city;
    }

    console.log("🚀 ~ onSubmit ~ userUpdatedData:", userUpdatedData);

    if (Object.keys(userUpdatedData).length === 0) {
      toast.error("No changes detected", { duration: 2000 });
      return;
    }

    const toastId = toast.loading("User updating...");
    try {
      await updateUser({ id, data: userUpdatedData }).unwrap();
      setOpen(false);
      reset();

      toast.success("User updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      console.error(error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          { id: toastId, duration: 2000 }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex cursor-pointer items-center gap-2 border-2 text-secondary px-4 py-1 rounded-md hover:bg-gray-200 transition"
      >
        <span className="text-sm font-madimi">Edit</span>
        <FaPencil className="size-3" />
      </button>

      <ConfigProvider
        theme={{
          token: {
            marginXS: 16,
            fontFamily: "Madimi One",
          },
        }}
      >
        <Modal open={open} onCancel={handleCancel} footer={null} width={350}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <div>
              <h1 className="font-berkshire text-2xl mb-5">Edit Profile</h1>
            </div>
            <Form.Item label="Name">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<FaUser className="mr-2" />}
                    placeholder="Enter your name"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Contact">
              <Controller
                name="contact"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<FaPhone className="mr-2" />}
                    placeholder="Enter your contact"
                    type="number"
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Address">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<FaMapMarkerAlt className="mr-2" />}
                    placeholder="Enter your address"
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="City">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<FaCity className="mr-2" />}
                    placeholder="Enter your city"
                  />
                )}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Dialog;
